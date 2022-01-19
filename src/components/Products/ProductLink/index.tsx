import Link from "next/link";
import React from "react";
import useI18n from "../../../hooks/i18n";
import { IProduct } from "../../../lib/interfaces/IProduct";
import ProductCard from "../ProductCard";

interface Props {
	product: IProduct;
}
export const ProductLink: React.FC<Props> = ({ product }) => {
	const { t } = useI18n();
	return (
		<Link href={`/product/${product.id}`}>
			<a>
				<ProductCard product={product} />
			</a>
		</Link>
	);
};

export default ProductLink;
