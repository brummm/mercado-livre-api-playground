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
export const listCategories = async (): Promise<ICategory> => {
	const URL = "https://api.mercadolibre.com/sites/MLB/categories";
	const EXPECTED_STATUS = 200;

	try {
		const response = await fetch(URL);
		const { status } = response;
		if (status === EXPECTED_STATUS) {
			const data = await response.json();
			return data;
		}
		throw new Error(
			`A API retornou com o status diferente de ${EXPECTED_STATUS} (${status}).`
		);
	} catch (e) {
		console.error(e);
	}
	return null;
	// TODO: add a error message displayer
};
