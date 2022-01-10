import { IInstallments } from "./IInstallments";
import { IPicture } from "./IPicture";
import { ISeller } from "./ISeller";


export interface IProduct {
	id: string;
	site_id: string;
	title: string;
	seller: ISeller;
	price: number;
	prices: any;
	sale_price: number | null;
	currency_id: string;
	available_quantity: number;
	sold_quantity: number;
	buying_mode: string;
	listing_type_id: string;
	stop_time: string;
	condition: string;
	permalink: string;
	thumbnail: string;
	thumbnail_id: string;
	pictures: IPicture[];
	accepts_mercadopago: boolean;
	installments: IInstallments;
	address: any;
	shipping: {
		free_shipping: boolean;
		mode: string;
		tags: string[];
		logistic_type: string;
		store_pick_up: boolean;
	};
	seller_address: any;
	attributes: any[];
	differential_pricing: { id: number; };
	original_price: number;
	category_id: string;
	official_store_id: any;
	domain_id: string;
	catalog_product_id: any;
	tags: string[];
	order_backend: number;
	use_thumbnail_id: boolean;
	offer_score: any;
	offer_share: any;
	match_score: any;
	winner_item_id: any;
	melicoin: any;
}
