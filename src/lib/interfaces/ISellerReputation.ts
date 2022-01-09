
export interface ISellerReputation {
	power_seller_status: string;
	level_id: string;
	metrics: any;
	transactions: {
		canceled: number;
		period: string;
		total: number;
		ratings: {
			negative: number;
			neutral: number;
			positive: number;
		};
		completed: number;
	};
}
