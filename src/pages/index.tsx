import { GetStaticProps } from "next";
import React from "react";
import { CategoryList } from "../components/Category";
import { PageTitle } from "../components/Texts";
import { listCategories } from "../lib/api";

export const getStaticProps: GetStaticProps = async (context) => {
	const data = await listCategories();
	if (data === null) {
		return { notFound: true };
	}
	return {
		props: { data },
		revalidate: 86400, // One day
	};
};

function Home({ data }) {
	return (
		<div>
			<PageTitle>Categorias de Produtos</PageTitle>
			<CategoryList data={data}></CategoryList>
		</div>
	);
}

export default Home;
