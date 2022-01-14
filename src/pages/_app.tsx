import { ShoppinCartContextProvider } from "../hooks/shoppingCart";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
	return (
		<ShoppinCartContextProvider>
			<Component {...pageProps} />
		</ShoppinCartContextProvider>
	);
}

export default MyApp;
