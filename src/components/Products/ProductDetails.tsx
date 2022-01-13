import { Heart } from "@styled-icons/boxicons-regular";
import { CartAdd } from "@styled-icons/boxicons-solid";
import React, { useState } from "react";
import { IProduct } from "../../lib/interfaces/IProduct";
import PageOverlay from "../Page/PageOverlay";
import { Progress } from "../Progress";
import SellerViewButton from "../Seller/SellerViewButton";
import Price from "./Price";
import ProductAttributes from "./ProductAttributes";
import ProductDescription from "./ProductDescription";
import styles from "./Products.module.scss";

interface Props {
	product: IProduct;
	description: string;
}

export const ProductDetails: React.FC<Props> = ({ product, description }) => {
	const { pictures, seller, attributes } = product;

	const [currentPicture, setCurrentPicture] = useState(1);
	const [infoVisible, setInfoVisible] = useState(false);

	const showInfo = () => {
		setInfoVisible(true);
	};
	const hideInfo = () => {
		setInfoVisible(false);
	};

	return (
		<section className={styles.details}>
			<section className={styles.pictures}>
				<figure>
					<Progress current={currentPicture} total={pictures.length} />
					{pictures.map((picture, index) => (
						<a
							href=""
							key={index}
							className={
								index + 1 === currentPicture ? styles.current : undefined
							}
						>
							<img src={picture.secure_url} />
						</a>
					))}
				</figure>
			</section>

			<section className={styles.prices}>
				{product.original_price !== null && (
					<p className={styles.originalPrice}>
						<Price price={product.original_price} />
					</p>
				)}
				<p className={styles.price}>
					<Price price={product.price} />
				</p>
			</section>

			<section className={styles.actions}>
				<div>
					<button className={styles.buttonCart}>
						<CartAdd size={32} />
						<span>Adicionar ao carrinho</span>
					</button>
				</div>
				<div>
					<button className={styles.buttonFavorites}>
						<Heart size={38} />
					</button>
				</div>
			</section>

			{seller && (
				<section className={styles.seller}>
					<SellerViewButton seller={seller} />
				</section>
			)}

			<hr className={styles.separator} />

			<section className={styles.block + " " + styles.attributes}>
				<h2>Informações do Produto</h2>
				<section className={styles.content}>
					<ProductAttributes attributes={attributes.slice(0, 3)} />
				</section>
				{attributes.length > 3 && (
					<a className={styles.more} href="#info" onClick={showInfo}>
						ver todas as informações
					</a>
				)}
				{infoVisible && (
					<PageOverlay title="Informações do Produto" hash="#info">
						<ProductAttributes attributes={attributes} />
					</PageOverlay>
				)}
			</section>

			<hr className={styles.separator} />

			<section className={styles.block}>
				<h2>Descrição</h2>
				<ProductDescription description={description} />
			</section>
		</section>
	);
};

export default ProductDetails;
