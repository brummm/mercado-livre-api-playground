import Link from "next/link";
import React, { useCallback, useEffect, useRef } from "react";
import { BiCart, BiChevronLeft, BiMenu } from "react-icons/bi";
import { PageTitle, PageTitleProps } from "../Texts";
import styles from "./Header.module.scss";

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
	const classNames = [styles.header];
	if (shrink) {
		classNames.push(styles.shrink);
	}

	const updateSpacer = () => {
		spacerRef.current.style.height = headerRef.current.offsetHeight + "px";
		// console.log(headerRef.current.offsetHeight);
	};

	useEffect(() => {
		const updateSpacerInterval = setInterval(updateSpacer, 20);
		return () => {
			clearTimeout(updateSpacerInterval);
		};
	}, []);

	return (
		<>
			<header ref={headerRef} className={classNames.join(" ")}>
				<section className={styles.navigation}>
					<a>
						<BiMenu aria-label="Menu" />
					</a>
					<nav className={styles.menu}>
						<ul>
							<li>
								<Link href="favoritos">
									<a>Favoritos</a>
								</Link>
							</li>
							<li>
								<Link href="creditos">
									<a>Créditos</a>
								</Link>
							</li>
						</ul>
					</nav>

					<Link href="carrinho">
						<a className={styles.carrinho}>
							<BiCart aria-label="Carrinho" />
						</a>
					</Link>
				</section>

				<section className={styles.title}>
					{back && (
						<Link href={back.url}>
							<a className={styles.back}>
								<BiChevronLeft /> <span>{back.title}</span>
							</a>
						</Link>
					)}
					<PageTitle type={titleType}>{title}</PageTitle>
				</section>
			</header>
			<p ref={spacerRef}></p>
		</>
	);
};

export default Header;
