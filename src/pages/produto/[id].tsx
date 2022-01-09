import { useRouter } from "next/router";
import React from "react";
import Loading from "../../components/Loading";
import Page from "../../components/Page";
import { getProduct } from "../../lib/api";
import { IProduct } from "../../lib/interfaces/IProduct";

export async function getStaticPaths() {
	return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
	const { id } = params;
	const product = await getProduct(id);
	return { props: { product } };
}
export const Product: React.FC<{ product: IProduct }> = ({ product }) => {
	const router = useRouter();
	if (router.isFallback) {
		return <Loading />;
	}
	console.log(product);


	return <Page title={product.title} titleType="small"></Page>;
};

export default Product;
