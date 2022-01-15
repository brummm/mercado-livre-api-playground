import { I18nContextProvider } from "../hooks/i18n";
import { ShoppinCartContextProvider } from "../hooks/shoppingCart";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
	return (
		<I18nContextProvider locales={["en", "pt-BR"]}>
			<ShoppinCartContextProvider>
				<Component {...pageProps} />
			</ShoppinCartContextProvider>
		</I18nContextProvider>
	);
}

export default MyApp;
