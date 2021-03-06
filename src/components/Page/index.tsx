import React, { ReactElement, useEffect, useState } from "react";
import Footer from "../Footer";
import Header, { HeaderBackButton, HeaderProps } from "../Header";
import styles from "./Page.module.scss";

export interface PageProps {
	title?: string;
	titleType?: HeaderProps["titleType"];
	back?: HeaderBackButton;
}
export const Page: React.FC<PageProps> = ({
	children,
	title,
	titleType,
	back,
}) => {
	const [shrink, setShrink] = useState(false);

	useEffect(() => {
		const scrollEvent = () => {
			if (window.scrollY > 75) {
				setShrink(true);
			} else {
				setShrink(false);
			}
		};
		window.addEventListener("scroll", scrollEvent);
		return () => {
			window.removeEventListener("scroll", scrollEvent);
		};
	}, []);
	return (
		<>
			<Header
				shrink={shrink}
				title={title}
				titleType={titleType}
				back={back}
			></Header>
			<main className={styles.main}>{children}</main>
			<Footer />
		</>
	);
};
export default Page;
