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
