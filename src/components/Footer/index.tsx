import React from "react";
import useI18n from "../../hooks/i18n";
import styles from "./Footer.module.scss";

export const Footer: React.FC = () => {
	const { t } = useI18n();
	const mlLink = (
		<a href="https://www.mercadolivre.com.br/" target="_blank">
			Mercado Livre
		</a>
	);
	return (
		<footer className={styles.footer}>
			<section
				className={styles.mercadoLivre}
				dangerouslySetInnerHTML={{
					__html: t(
						"Using {1}'s Api.",
						`<a href="https://www.mercadolivre.com.br/" target="_blank">Mercado Livre</a>`
					),
				}}
			/>
		</footer>
	);
};

export default Footer;
