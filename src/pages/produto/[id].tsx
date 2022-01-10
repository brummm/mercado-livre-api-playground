import { useRouter } from "next/router";
import React, { useState } from "react";
import "react-activity/dist/Spinner.css";
import { HeaderBackButton } from "../../components/Header";
import { LoadingPage } from "../../components/Loading";
import Page from "../../components/Page";
import ProductDetails from "../../components/Products/ProductDetails";
import { getCategory, getProduct } from "../../lib/api";
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
		const category = await getCategory(product.category_id);
		return { props: { product, category } };
	} catch (e) {
		return {
			notFound: true,
		};
	}
}
export const Product: React.FC<{ product: IProduct; category: ICategory }> = ({
	product,
	category,
}) => {
	const router = useRouter();
	if (router.isFallback) {
		return <LoadingPage />;
	}

	let back: HeaderBackButton;
	if (category) {
		back = {
			title: category.name,
			url: "/categoria/" + category.id,
		};
	} else {
		back = {
			title: "Ver categorias",
			url: "/",
		};
	}

	return (
		<Page title={product.title} titleType="small" back={back}>
			<ProductDetails product={product} />
		</Page>
	);
};

export default Product;
