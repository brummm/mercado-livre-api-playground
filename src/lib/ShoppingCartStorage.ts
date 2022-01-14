import { IProduct } from "./interfaces/IProduct";

export interface ShoppingCartItem {
	total: number;
	product: IProduct;
}

export class ShoppingCartStorage {
	static readonly STORAGE_KEY = "SHOPPING_CART";

	private static items: ShoppingCartItem[];

	private static loadItems(): ShoppingCartItem[] {
		if (ShoppingCartStorage.items) return ShoppingCartStorage.items;
		const storage = localStorage.getItem(ShoppingCartStorage.STORAGE_KEY);

		ShoppingCartStorage.items = storage
			? <ShoppingCartItem[]>JSON.parse(storage)
			: [];

			console.log(ShoppingCartStorage.items);

		return ShoppingCartStorage.items;
	}

	private static saveItems(): void {
		localStorage.setItem(
			ShoppingCartStorage.STORAGE_KEY,
			JSON.stringify(ShoppingCartStorage.loadItems())
		);
	}

	static getList = (): ShoppingCartItem[] => {
		return ShoppingCartStorage.loadItems();
	};

	static getTotal(): number {
		return ShoppingCartStorage.loadItems().reduce(
			(total, item) => total + item.total,
			0
		);
	}

	static addToCart(product: IProduct) {
		const items = ShoppingCartStorage.loadItems();
		const productInCart = items.find((item) => item.product.id === product.id);
		if (productInCart) {
			productInCart.total++;
		} else {
			items.push({
				total: 1,
				product,
			});
		}
		ShoppingCartStorage.saveItems();
	}
}
