import React from "react";
import styles from "./Texts.module.scss";

export interface PageTitleProps {
	type: "normal" | "medium" | "small";
}
export const PageTitle: React.FC<PageTitleProps> = ({ children, type }) => {
	const classes = [styles.pageTitle];
	if (type === "medium") {
		classes.push(styles.medium);
	} else if (type === "small") {
		classes.push(styles.small);
	}
	return <h1 className={classes.join(" ")}>{children}</h1>;
};
