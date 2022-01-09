import React from "react";
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
	return (
		<footer className={styles.footer}>
			<section className={styles.mercadoLivre}>
					Usando a API do{" "}
					<a href="https://www.mercadolivre.com.br/" target="_blank">
						Mercado Livre
					</a>
				</section>
		</footer>
	);
};

export default Footer;
