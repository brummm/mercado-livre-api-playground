import React from "react";
import { ICategory } from "../../lib/api";

type Props = {
	data: ICategory[];
};
export const CategoryList: React.FC<Props> = ({ data }) => {
	data.forEach(category => {
		console.log('aqui -->', category);

	})
	return (
		<ul>
			{data.map(({ name, id }) => (
				<li key={id}>{name}</li>
			))}
		</ul>
	);
};
