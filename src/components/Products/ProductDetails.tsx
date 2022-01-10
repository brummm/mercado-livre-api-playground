import { Heart } from "@styled-icons/boxicons-regular";
import { CartAdd } from "@styled-icons/boxicons-solid";
import React, { useState } from "react";
import { IProduct } from "../../lib/interfaces/IProduct";
import { Progress } from "../Progress";
import SellerViewButton from "../Seller/SellerViewButton";
import styles from "./Products.module.scss";

interface Props {
	product: IProduct;
}

export const ProductDetails: React.FC<Props> = ({ product }) => {
	const { pictures, seller } = product;

	const [currentPicture, setCurrentPicture] = useState(1);

	return (
		<section className={styles.details}>
			<section className={styles.pictures}>
				<figure>
					<Progress current={currentPicture} total={pictures.length} />
					{pictures.map((picture, index) => (
						<a
							href=""
							key={index}
							className={index + 1 === currentPicture ? styles.current : undefined}
						>
							<img src={picture.secure_url} />
						</a>
					))}
				</figure>
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
		</section>
	);
};

export default ProductDetails;
