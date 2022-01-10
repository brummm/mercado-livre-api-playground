import React, { useState } from "react";
import { IProduct } from "../../lib/interfaces/IProduct";
import { Progress } from "../Progress";
import styles from "./Products.module.scss";

interface Props {
	product: IProduct;
}

export const ProductDetails: React.FC<Props> = ({ product }) => {
	const { pictures } = product;


	const [currentPicture, setCurrentPicture] = useState(1);

	return (
		<section className={styles.details}>
			<section className={styles.pictures}>
				<figure>
					<Progress current={currentPicture} total={pictures.length} />
					{pictures.map((picture) => (
						<img src={picture.secure_url} />
					))}
				</figure>
			</section>
		</section>
	);
};


export default ProductDetails;
