import { createContext, FC, useContext, useEffect, useState } from "react";
import { IProduct } from "../lib/interfaces/IProduct";
import { ShoppingCartStorage } from "../lib/ShoppingCartStorage";

interface ShoppinCartContextProps {
	totalItemsCarrinho: number;
	addProduct: (product: IProduct) => void;
}

export const ShoppinCartContext = createContext<ShoppinCartContextProps>(
	{} as ShoppinCartContextProps
);

export const useShoppingCart = () => useContext(ShoppinCartContext);

export const ShoppinCartContextProvider: FC = ({ children }) => {
	const [totalItemsCarrinho, setTotalItemsCarrinho] = useState(0);
	useEffect(() => {
		setTotalItemsCarrinho(ShoppingCartStorage.getTotal());
	}, []);

	const addProduct = (product: IProduct) => {
		ShoppingCartStorage.addToCart(product);
		setTotalItemsCarrinho(ShoppingCartStorage.getTotal());
	};
	return (
		<ShoppinCartContext.Provider value={{ totalItemsCarrinho, addProduct }}>
			{children}
		</ShoppinCartContext.Provider>
	);
};

export default useShoppingCart;
