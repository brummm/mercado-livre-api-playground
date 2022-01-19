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

		return ShoppingCartStorage.items;
	}

	private static saveItems(items = null): void {
		if (items === null) {
			items = ShoppingCartStorage.loadItems();
		}
		localStorage.setItem(
			ShoppingCartStorage.STORAGE_KEY,
			JSON.stringify(items)
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

	static getTotalPrice(): number {
		return ShoppingCartStorage.loadItems().reduce(
			(total, item) => total + item.product.price * item.total,
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
		ShoppingCartStorage.saveItems(items);
	}

	static removeFromCart(product: IProduct, all = false) {
		let items = ShoppingCartStorage.loadItems();
		const productInCart = items.find((item) => item.product.id === product.id);
		if (productInCart) {
			productInCart.total--;
			if (productInCart.total <= 0 || all) {
				items = items.filter((item) => item.product.id !== product.id);
			}
		} else {
			items.push({
				total: 1,
				product,
			});
		}
		ShoppingCartStorage.saveItems(items);
	}
}
