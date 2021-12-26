import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ICategory } from "../../lib/api";
import styles from "./Category.module.scss";

type CategoryListProps = {
	data: ICategory[];
};
export const CategoryList: React.FC<CategoryListProps> = ({ data }) => {
	return (
		<ul className={styles.list}>
			{data.map((category) => (
				<li key={category.id}>
					<Category category={category}></Category>
				</li>
			))}
		</ul>
	);
};

type CategoryProps = {
	category: ICategory;
};

const originalClassNames = [styles.category]
export const Category: React.FC<CategoryProps> = ({ category }) => {
	const [opened, setOpened] = useState(false);
	const [classNames, setClassNames] = useState(originalClassNames);
	const { name, id, children_categories } = category;

	useEffect(() => {
		const _classNames = [...originalClassNames];
		if (opened) {
			_classNames.push(styles.opened);
		}
		setClassNames(_classNames);
	}, [opened]);
	return (
		<section className={classNames.join(" ")}>
			<button
				onClick={(e) => {
					e.preventDefault();
					setOpened(!opened);
				}}
			>
				{name}
			</button>
			{opened && (
				<ul>
					{children_categories.map(({ name, id }) => (
						<li key={id}>
							<Link href="/produtos">{name}</Link>
						</li>
					))}
				</ul>
			)}
		</section>
	);
};
