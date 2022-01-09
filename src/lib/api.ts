export interface ICategory {
	id: string;
	name: string;
	picture?: string;
	permalink?: string;
	total_items_in_this_category?: number;
	path_from_root?: ICategory[];
	children_categories?: ICategory[];
	attribute_types?: string;
	settings?: any;
	channels_settings?: any[];
	meta_categ_id?: string;
	attributable?: boolean;
	date_created?: string;
}

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

