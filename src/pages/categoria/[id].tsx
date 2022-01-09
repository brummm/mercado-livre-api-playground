import { GetStaticProps } from "next";
import React from "react";
import Page from "../../components/Page";
import { getCategory, listCategories } from "../../lib/api";


function Category({ data }) {
	return (
		<Page title="teste" titleType="medium">
			<p>teste</p>
		</Page>
	);
}

export default Category;
