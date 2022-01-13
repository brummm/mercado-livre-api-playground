import React from "react";
import { IProductAttributes } from "../../../lib/interfaces/IProductAttributes";
import styles from "./ProductAttributes.module.scss";

interface Props {
	attributes: IProductAttributes[];
}
export const ProductAttributes: React.FC<Props> = ({ attributes }) => {
	return (
		<table className={styles.attributes}>
			<tbody>
				{attributes.map((attribute, index) => (
					<tr key={attribute.id + index}>
						<th>{attribute.name}</th>
						<td>{attribute.value_name}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default ProductAttributes;
