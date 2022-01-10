import { GetStaticProps } from "next";
import React from "react";
import { CategoryList } from "../components/Category";
import Page from "../components/Page";
import { getCategory, listCategories } from "../lib/api";

export const getStaticProps: GetStaticProps = async (context) => {
	const data = await listCategories();
	if (data === null) {
		return { notFound: true };
	}

	const promises = data.map(async (category) => {
		const request = await getCategory(category.id);
		category.children_categories = request.children_categories;
		return category;
	});
	await Promise.allSettled(promises);

	return {
		props: { data },
		revalidate: 86400, // One day
	};
};

function Home({ data }) {
	return (
		<Page title="Categorias de Produtos">
			<CategoryList data={data}></CategoryList>
		</Page>
	);
}

export default Home;
