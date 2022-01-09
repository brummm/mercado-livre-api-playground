import Link from "next/link";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
	BiChevronLeft,
	BiChevronLeftCircle,
	BiChevronRightCircle,
} from "react-icons/bi";
import { ICategory } from "../../lib/api";
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

	const closeOthers = useCallback(
		(current) => {
			const openables = openableCategories.map((openableCategory) => {
				if (openableCategory.category.id !== current.id) {
					openableCategory.opened = false;
				}
				return openableCategory;
			});

			setOpenableCategories(openables);
		},
		[data]
	);

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
const ITEMS_PER_PAGE = 6;
const TRANSITION_MILIS = 150;
export const Category: React.FC<CategoryProps> = ({
	openableCategory,
	onOpen = () => {},
}) => {
	const [classNames, setClassNames] = useState(originalClassNames);
	const [opened, setOpened] = useState(openableCategory.opened);
	const { name, id, children_categories } = openableCategory.category;
	const [first, setFirst] = useState(0);
	const [showingCategories, setShowingCategories] = useState([]);
	const categoryListRef = useRef(null);

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

	useEffect(() => {
		const toShow = [];
		for (
			let i = first, j = 0;
			i < children_categories.length && j < ITEMS_PER_PAGE;
			i++, j++
		) {
			toShow.push(children_categories[i]);
		}
		setShowingCategories(toShow);
	}, [first]);

	const hasPrevious = useCallback(() => {
		const newFirst = first - ITEMS_PER_PAGE;
		if (newFirst >= 0) {
			return newFirst;
		}
		return null;
	}, [first]);

	const previous = useCallback(() => {
		const newFirst = hasPrevious();
		if (newFirst !== null) {
			categoryListRef.current.className = styles.leaveRight;
			setTimeout(() => {
				categoryListRef.current.className = styles.enterLeft;
				setFirst(newFirst);
			}, TRANSITION_MILIS);
		}
	}, [first]);

	const hasNext = useCallback(() => {
		const newFirst = first + ITEMS_PER_PAGE;

		if (newFirst < children_categories.length) {
			return newFirst;
		}
		return null;
	}, [first]);
	const next = useCallback(() => {
		const newFirst = hasNext();
		if (newFirst !== null) {
			categoryListRef.current.className = styles.leaveLeft;
			setTimeout(() => {
				categoryListRef.current.className = styles.enterRight;
				setFirst(newFirst);
			}, TRANSITION_MILIS);
		}
	}, [first]);

	return (
		<section className={classNames.join(" ")}>
			<button
				className={styles.categoryButton}
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
				<div>
					<ul ref={categoryListRef}>
						{showingCategories.map(({ name, id }) => (
							<li key={id}>
								<Link href={`/categoria/${id}`}><a>{name}</a></Link>
							</li>
						))}
					</ul>
					<nav>
						<button
							className={styles.navButton}
							disabled={hasPrevious() === null}
							onClick={(e) => {
								e.preventDefault();
								previous();
							}}
						>
							<BiChevronLeftCircle />
						</button>
						<button
							className={styles.navButton}
							disabled={hasNext() === null}
							onClick={(e) => {
								e.preventDefault();
								next();
							}}
						>
							<BiChevronRightCircle />
						</button>
					</nav>
				</div>
			)}
		</section>
	);
};
