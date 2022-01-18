import { ChevronLeft } from "@styled-icons/boxicons-regular";
import { Cart } from "@styled-icons/boxicons-solid";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useI18n from "../../hooks/i18n";
import useShoppingCart from "../../hooks/shoppingCart";
import { PageTitle, PageTitleProps } from "../Texts";
import styles from "./Header.module.scss";
import Navigation from "./Navigation";

export interface HeaderBackButton {
	title: string;
	url: string;
}
export interface HeaderProps {
	shrink: boolean;
	title: string;
	back?: HeaderBackButton;
	titleType?: PageTitleProps["type"];
}
export const Header: React.FC<HeaderProps> = ({
	shrink,
	title,
	back,
	titleType,
}) => {
	const headerRef = useRef(null);
	const spacerRef = useRef(null);
	const { t } = useI18n();
	const [classNames, setClassNames] = useState([styles.header]);
	const { totalItemsCarrinho } = useShoppingCart();
	const { locales, locale } = useI18n();

	const updateSpacer = () => {
		spacerRef.current.style.height = headerRef.current.offsetHeight + "px";
	};

	const updateClassName = useCallback(() => {
		const _classNames = [styles.header];
		if (shrink) {
			_classNames.push(styles.shrink);
		}
		setClassNames(_classNames);
	}, [shrink]);

	useEffect(() => {
		updateSpacer();
	}, []);

	useEffect(() => {
		updateClassName();
	}, [shrink]);

	return (
		<>
			<header ref={headerRef} className={classNames.join(" ")}>
				<section className={styles.navigation}>

					<Navigation />

					<section className={styles.localesCart}>
						<nav className={styles.locales}>
							<ul>
								{locales
									.filter((_locale) => _locale !== locale)
									.map((locale) => (
										<li key={locale}>
											<Link href="./" locale={locale}>
												<a>{locale}</a>
											</Link>
										</li>
									))}
							</ul>
						</nav>

						<Link href="cart">
							<a className={styles.cart}>
								<p aria-label={t("Total items in cart.")}>
									{totalItemsCarrinho}
								</p>
								<Cart aria-label="Carrinho" />
							</a>
						</Link>
					</section>
				</section>

				<section className={styles.title}>
					{back && (
						<Link href={back.url}>
							<a className={styles.back}>
								<ChevronLeft /> <span>{back.title}</span>
							</a>
						</Link>
					)}
					{title && <PageTitle type={titleType}>{title}</PageTitle>}
				</section>
			</header>
			<p ref={spacerRef}></p>
		</>
	);
};

export default Header;
