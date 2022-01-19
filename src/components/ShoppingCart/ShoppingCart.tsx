import React, { useEffect, useState } from "react";
import useShoppingCart from "../../hooks/shoppingCart";
import {
	ShoppingCartItem,
	ShoppingCartStorage,
} from "../../lib/ShoppingCartStorage";
import { LoadingCentered } from "../Loading";
import Price from "../Products/Price";
import ProductCard from "../Products/ProductCard";
import ProductCartControls from "./ProductCartControls";
import styles from "./ShoppingCart.module.scss";

function ShoppingCart() {
	const [items, setItems] = useState<ShoppingCartItem[]>(null);
	const { totalPrice } = useShoppingCart();
	useEffect(() => {
		setItems(ShoppingCartStorage.getList());
	}, []);

	if (items === null) return <LoadingCentered />;
	return (
		<>
			<ul className={styles.items}>
				{items.length &&
					items.map((item) => (
						<li key={item.product.id}>
							<ProductCard product={item.product} />
							<ProductCartControls item={item} />
						</li>
					))}
			</ul>
			<p>{totalPrice}</p>
			<p><Price price={totalPrice} /></p>
		</>
	);
}

export default ShoppingCart;
