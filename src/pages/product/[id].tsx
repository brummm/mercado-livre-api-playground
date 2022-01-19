import { useRouter } from "next/router";
import React, { useState } from "react";
import "react-activity/dist/Spinner.css";
import { HeaderBackButton } from "../../components/Header";
import { LoadingPage } from "../../components/Loading";
import Page from "../../components/Page";
import ProductDetails from "../../components/Products/ProductDetails";
import useI18n from "../../hooks/i18n";
import {
	getCategory,
	getDescription,
	getProduct,
	getSeller,
} from "../../lib/api";
import { ICategory } from "../../lib/interfaces/ICategory";
import { IProduct } from "../../lib/interfaces/IProduct";

export async function getStaticPaths() {
	return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
	const { id } = params;
	try {
		const product = await getProduct(id);
		if (!product) {
			throw Error();
		}

		const promiseCategory = getCategory(product.category_id);
		const promiseSeller = getSeller(product.seller_id);
		const promiseDescription = getDescription(id);
		await Promise.allSettled([
			promiseCategory,
			promiseSeller,
			promiseDescription,
		]);
		const category = await promiseCategory;
		product.seller = await promiseSeller;
		const { plain_text: description } = await promiseDescription;

		return { props: { product, category, description } };
	} catch (e) {
		return {
			notFound: true,
		};
	}
}

interface Props {
	product: IProduct;
	category: ICategory;
	description: string;
}
export const Product: React.FC<Props> = ({
	product,
	category,
	description,
}) => {
	const router = useRouter();
	const {t} = useI18n();
	if (router.isFallback) {
		return <LoadingPage />;
	}

	let back: HeaderBackButton;
	if (category) {
		back = {
			title: category.name,
			url: "/category/" + category.id,
		};
	} else {
		back = {
			title: t("See Categories"),
			url: "/",
		};
	}

	return (
		<Page title={product.title} titleType="small" back={back}>
			<ProductDetails product={product} description={description} />
		</Page>
	);
};

export default Product;
