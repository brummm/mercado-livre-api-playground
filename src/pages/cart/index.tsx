import React from "react";
import Page from "../../components/Page";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import useI18n from "../../hooks/i18n";

export const Cart: React.FC = () => {
	const { t } = useI18n();

	return (
		<Page title={t("Shopping Cart")} titleType="medium">
			<ShoppingCart />
		</Page>
	);
};

export default Cart;
