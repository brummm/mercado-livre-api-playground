import { ISellerReputation } from "./ISellerReputation";

export interface ISeller {
	id: number;
	permalink: string;
	registration_date: string;
	car_dealer: boolean;
	real_estate_agency: boolean;
	tags: string[];
	eshop: any;
	seller_reputation: ISellerReputation;
}
