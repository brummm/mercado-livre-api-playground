import React, { ReactElement, useEffect, useState } from "react";
import Footer from "../Footer";
import Header, { HeaderProps } from "../Header";
import styles from "./Page.module.scss";

interface PageProps {
	title: string;
	titleType?: HeaderProps['titleType']
}
export const Page: React.FC<PageProps> = ({ children, title, titleType }) => {
	const [shrink, setShrink] = useState(false);

	useEffect(() => {
		const scrollEvent = () => {
			if (window.scrollY > 50) {
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
			<Header shrink={shrink} title={title} titleType={titleType}></Header>
			<main className={styles.main}>{children}</main>
			<Footer />
		</>
	);
};
export default Page;
