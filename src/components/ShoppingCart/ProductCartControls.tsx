import React from "react";
import useShoppingCart from "../../hooks/shoppingCart";
import { ShoppingCartItem } from "../../lib/ShoppingCartStorage";

export const ProductCartControls: React.FC<{ item: ShoppingCartItem }> = ({
	item,
}) => {
	const { addProduct, removeProduct } = useShoppingCart();
	return (
		<section>
			<button
				onClick={(e) => {
					e.preventDefault();
					addProduct(item.product);
				}}
			>
				+
			</button>
			<button
				onClick={(e) => {
					e.preventDefault();
					removeProduct(item.product);
				}}
			>
				-
			</button>
			<p>{item.total}</p>
		</section>
	);
};

export default ProductCartControls;
