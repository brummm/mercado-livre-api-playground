import React, { useCallback, useEffect, useState } from "react";
import useI18n from "../../hooks/i18n";
import styles from "./Products.module.scss";

const THRESHOLD = 150;
interface Props {
	description: string;
}
export const ProductDescription: React.FC<Props> = ({ description }) => {
	const [lines, setLines] = useState([]);
	const [showFullDescription, setShowFullDescription] = useState(null);
	const { t } = useI18n();

	useEffect(() => {
		if (description.length > THRESHOLD) {
			setShowFullDescription(false);
			shrinkDescription();
		} else {
			setLines(description.split(/\r?\n/));
		}
	}, []);

	const openDescription = useCallback(() => {
		setLines(description.split(/\r?\n/));
		setShowFullDescription(true);
	}, [description]);

	const shrinkDescription = useCallback(() => {
		const finalDescription =
			description.substring(0, description.lastIndexOf(" ", THRESHOLD)) + "...";
		setLines(finalDescription.split(/\r?\n/));
		setShowFullDescription(false);
	}, [description]);
	return (
		<>
			<section className={styles.content + " " + styles.description}>
				{lines.map((line) => (
					<p>{line}</p>
				))}
			</section>

			{showFullDescription && (
				<a className={styles.more} onClick={shrinkDescription}>
					{t("less")}
				</a>
			)}

			{showFullDescription === false && (
				<a className={styles.more} onClick={openDescription}>
					{t("read more")}
				</a>
			)}
		</>
	);
};

export default ProductDescription;
