import { useRouter } from "next/router";
import React from "react";
import { LoadingPage } from "../../components/Loading";
import Page from "../../components/Page";
import useI18n from "../../hooks/i18n";
import { ICategory } from "../../lib/interfaces/ICategory";

export const Cart: React.FC<{ category: ICategory }> = ({ category }) => {
	const router = useRouter();
	if (router.isFallback) {
		return <LoadingPage />;
	}
	const { t } = useI18n();
	return (
		<Page title={t("Shopping Cart")} titleType="medium">
		</Page>
	);
};

export default Cart;
