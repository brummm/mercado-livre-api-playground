import React from "react";
import { ISearchResults } from "../../lib/interfaces/ISearchResults";
import { LoadingCentered } from "../Loading";
import ProductLink from "./ProductLink";

interface ProductListProps {
	data: ISearchResults;
	error: any;
}
export const ProductList: React.FC<ProductListProps> = ({ data, error }) => {
	if (error) return <p>Error</p>;
	if (!data) return <LoadingCentered />;
	return (
		<ul>
			{data.results.map((product) => (
				<li key={product.id}>
					<ProductLink product={product} />
				</li>
			))}
		</ul>
	);
};

export default ProductList;
