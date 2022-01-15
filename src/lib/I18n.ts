const STORAGE_KEY = "I18N";

export interface ITranlations {
	[key: string]: string;
}
export const evaluateLanguage = async (
	acceptedLocales: string[], locales: string[]
): Promise<{ language: string; translations: ITranlations[] }> => {
	const foundLanguage = acceptedLocales.find((language) =>
		locales.some((locale) => locale === language)
	);

	const language = foundLanguage ?? acceptedLocales[0];

	const translations = await loadTranslations(language);

	return {
		language,
		translations,
	};
};

const loadTranslations = async (locale: string): Promise<ITranlations[]> => {
	try {
		return await import(`../locales/${locale}.json`);
	} catch (e) {
		console.error(`Could not load locale: ${locale}.`);
		return [];
	}
};
