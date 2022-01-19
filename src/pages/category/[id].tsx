import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { HeaderBackButton } from "../../components/Header";
import { LoadingPage } from "../../components/Loading";
import Page from "../../components/Page";
import ProductList from "../../components/Products/ProductList";
import useI18n from "../../hooks/i18n";
import { buildSearchUrl, getCategory } from "../../lib/api";
import { ICategory } from "../../lib/interfaces/ICategory";

export async function getStaticPaths() {
	return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
	const { id } = params;
	const category = await getCategory(id);
	return { props: { category } };
}

const fetcher = (url) => fetch(url).then((res) => res.json());

export const Category: React.FC<{ category: ICategory }> = ({ category }) => {
	const router = useRouter();
	if (router.isFallback) {
		return <LoadingPage />;
	}
	const { t } = useI18n();
	const { id } = category;

	const { data, error } = useSWR(buildSearchUrl({ category: id }), fetcher);

	const back: HeaderBackButton = {
		title: t("See Categories"),
		url: "/",
	};
	return (
		<Page title={category.name} titleType="medium" back={back}>
			<ProductList data={data} error={error} />
		</Page>
	);
};

export default Category;
