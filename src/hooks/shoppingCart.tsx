import { createContext, FC, useContext, useEffect, useState } from "react";
import { IProduct } from "../lib/interfaces/IProduct";
import { ShoppingCartStorage } from "../lib/ShoppingCartStorage";

interface ShoppinCartContextProps {
	totalCartItems: number;
	totalPrice: number;
	addProduct: (product: IProduct) => void;
	removeProduct: (product: IProduct, all?: boolean) => void;
}

export const ShoppinCartContext = createContext<ShoppinCartContextProps>(
	{} as ShoppinCartContextProps
);

export const useShoppingCart = () => useContext(ShoppinCartContext);

export const ShoppinCartContextProvider: FC = ({ children }) => {
	const [totalCartItems, setTotalCartItems] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	const updateTotals = () => {
		setTotalCartItems(ShoppingCartStorage.getTotal());
		setTotalPrice(ShoppingCartStorage.getTotalPrice());
	};

	useEffect(() => {
		updateTotals();
	}, []);

	const addProduct = (product: IProduct) => {
		ShoppingCartStorage.addToCart(product);
		updateTotals();
	};

	const removeProduct = (product: IProduct) => {
		ShoppingCartStorage.removeFromCart(product);
		updateTotals();
	};
	return (
		<ShoppinCartContext.Provider
			value={{ totalCartItems, totalPrice, addProduct, removeProduct }}
		>
			{children}
		</ShoppinCartContext.Provider>
	);
};

export default useShoppingCart;
