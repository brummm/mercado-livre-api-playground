import { ICategory } from "./interfaces/ICategory";
import { IProduct } from "./interfaces/IProduct";
import { ISearchResults } from "./interfaces/ISearchResults";
import { ISeller } from "./interfaces/ISeller";

const apiError = (expectedStatus: number, status: number) => {
	throw new Error(
		`A API retornou com o status diferente de ${expectedStatus} (${status}).`
	);
};

const apiGet = async (url, expectedStatus = 200): Promise<any> => {
	try {
		const response = await fetch(url);
		const { status } = response;
		if (status === expectedStatus) {
			const data = await response.json();
			return data;
		}
		apiError(expectedStatus, status);
	} catch (e) {
		console.error(e);
	}
	return null;
};

export const listCategories = async (): Promise<ICategory[]> => {
	return await apiGet("https://api.mercadolibre.com/sites/MLB/categories");
};

export const getCategory = async (id: string): Promise<ICategory> => {
	return await apiGet("https://api.mercadolibre.com/categories/" + id);
};

export const getSeller = async (id: number): Promise<ISeller> => {
	return await apiGet("https://api.mercadolibre.com/users/" + id);
}

const SEARCH_URL = "https://api.mercadolibre.com/sites/MLB/search";

export type SearchUrlParms = {
	[name: string]: string;
};

const search = async (parms: SearchUrlParms): Promise<ISearchResults> => {
	return apiGet(buildSearchUrl(parms));
};

export const buildSearchUrl = (parms: SearchUrlParms): string => {
	const concatParms = Object.keys(parms)
		.map((key) => key + "=" + encodeURI(parms[key]))
		.join("&");
	return SEARCH_URL + "?" + concatParms;
};

export const getProductsFromCategory = async (
	categoryId: string
): Promise<ISearchResults> => {
	return await search({
		category: categoryId,
	});
};

export const getProduct = async (productId: string): Promise<IProduct> => {
	return await apiGet(`https://api.mercadolibre.com/items/${productId}`);
}


export const stringToDate = (dateString: string): string => {
	return '';
}
