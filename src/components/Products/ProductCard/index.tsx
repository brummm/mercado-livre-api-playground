import React from "react";
import useI18n from "../../../hooks/i18n";
import { IProduct } from "../../../lib/interfaces/IProduct";
import Price from "../Price";
import styles from "./ProductCard.module.scss";

interface Props {
	product: IProduct;
}
export const ProductCard: React.FC<Props> = ({ product }) => {
	const { t } = useI18n();
	return (
		<section className={styles.card}>
			<figure>
				<img
					src={product.thumbnail}
					alt={t("Image of Product {1}", product.title)}
				/>
			</figure>
			<section className={styles.data}>
				<h2>{product.title}</h2>
				<section className={styles.prices}>
					<p className={styles.main}>
						<Price price={product.price} />
					</p>
				</section>
			</section>
		</section>
	);
};

export default ProductCard;
