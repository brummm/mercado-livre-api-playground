import React from "react";
import styles from "./Page.module.scss";

export const Page: React.FC = ({children}) => {
	return (
		<>
			<header className={styles.mercadoLivre}>
				Usando a API do <a href="">Mercado Livre</a>
			</header>
			<main className={styles.main}>{children}</main>
		</>
	);
};
export default Page;
