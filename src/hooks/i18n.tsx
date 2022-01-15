import { useRouter } from "next/router";
import {
	createContext,
	FC,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

export interface ITranlations {
	[key: string]: string;
}

interface I18nContextProps {
	locale: string;
	t: (key: string, ...args: any) => string;
	locales: string[];
}

export const I18nContext = createContext<I18nContextProps>(
	{} as I18nContextProps
);

export const useI18n = () => useContext(I18nContext);

interface I18nContextProviderProps {
	locales: string[];
}
export const I18nContextProvider: FC<I18nContextProviderProps> = ({
	locales: localesProp,
	children,
}) => {
	const { locale, locales, defaultLocale } = useRouter();

	const [translations, setTranslations] = useState([]);

	const loadTranslations = useCallback(
		async (locale: string): Promise<ITranlations[]> => {
			try {
				return await import(`../locales/${locale}.json`);
			} catch (e) {
				console.error(`Could not load locale: ${locale}.`);
				return [];
			}
		},
		[]
	);

	const evaluateLanguage = useCallback(
		async (
			acceptedLocales: string[],
			locales: string[],
			locale: string
		): Promise<{ language: string; translations: ITranlations[] }> => {
			let foundLanguage = locale;
			if (!acceptedLocales.includes(locale)) {
				foundLanguage = acceptedLocales.find((language) =>
					locales.some((locale) => locale === language)
				);
			}

			const language = foundLanguage ?? acceptedLocales[0];

			const translations = await loadTranslations(language);

			return {
				language,
				translations,
			};
		},
		[]
	);

	useEffect(() => {
		evaluateLanguage(localesProp, locales, locale).then((response) => {
			const { language, translations } = response;
			setTranslations(translations);
		});
	}, [locale]);

	const t = useCallback(
		(key: string, ...args): string => {
			const translation = translations[key] || key;
			return format(translation, ...args);
		},
		[translations]
	);

	return (
		<I18nContext.Provider value={{ locale, t, locales: localesProp }}>
			{children}
		</I18nContext.Provider>
	);
};

const format = (translation: string, ...args): string => {
	if (!args || args.length === 0) {
		return translation;
	}
	return args.reduce(
		(formatted, arg, index) =>
			formatted.replace(new RegExp("\\{" + (index + 1) + "\\}", "gi"), arg),
		translation
	);
};

export default useI18n;
