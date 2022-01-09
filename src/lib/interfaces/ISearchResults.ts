import { IProduct } from "./IProduct";


export interface ISearchResults {
	paging: {
		total: number;
		primary_results: number;
		offset: number;
		limit: number;
	};
	results: IProduct[];
}
