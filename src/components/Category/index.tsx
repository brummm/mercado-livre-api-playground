import Link from "next/link";
import React, { memo, useCallback, useEffect, useState } from "react";
import { ICategory } from "../../lib/api";
import { BiChevronLeft } from "react-icons/bi";
import styles from "./Category.module.scss";

type CategoryListProps = {
	data: ICategory[];
};
type OpenableCategory = {
	opened: boolean;
	category: ICategory;
};
export const CategoryList: React.FC<CategoryListProps> = memo(({ data }) => {
	const [openableCategories, setOpenableCategories] = useState(
		data.map((category) => {
			return { category: category, opened: false };
		})
	);

	const closeOthers = useCallback((current) => {
		const openables = openableCategories.map((openableCategory) => {
			if (openableCategory.category.id !== current.id) {
				openableCategory.opened = false;
			}
			return openableCategory;
		});
		console.log(openables);

		setOpenableCategories(openables);
	}, [data]);

	return (
		<ul className={styles.list}>
			{openableCategories.map((category) => (
				<li key={category.category.id}>
					<Category openableCategory={category} onOpen={closeOthers}></Category>
				</li>
			))}
		</ul>
	);
});

type CategoryProps = {
	openableCategory: OpenableCategory;
	onOpen: Function;
};

const originalClassNames = [styles.category];
export const Category: React.FC<CategoryProps> = ({
	openableCategory,
	onOpen = () => {},
}) => {
	const [classNames, setClassNames] = useState(originalClassNames);
	const [opened, setOpened] = useState(openableCategory.opened);
	const { name, id, children_categories } = openableCategory.category;

	useEffect(() => {
		if (openableCategory.opened !== opened) {
			setOpened(openableCategory.opened);
		}
	});

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
					openableCategory.opened = !openableCategory.opened;
					setOpened(openableCategory.opened);
					if (openableCategory.opened === true)
						onOpen(openableCategory.category);
				}}
			>
				<span>{name}</span>
				<BiChevronLeft className={styles.icon} />
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
