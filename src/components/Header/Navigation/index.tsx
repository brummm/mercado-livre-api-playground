import { Menu, X } from "@styled-icons/boxicons-regular";
import Link from "next/link";
import React, { useState } from "react";
import useI18n from "../../../hooks/i18n";
import styles from "./Navigation.module.scss";
import { Cart, Megaphone, Star } from "@styled-icons/boxicons-solid";

export const Navigation: React.FC = () => {
	const { t } = useI18n();
	const [opened, setOpened] = useState(true);
	const classNames = [styles.menu];
	if (opened) {
		classNames.push(styles.opened);
	}

	const toggleOpen = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const _opened = !opened;
		const html = document.getElementsByTagName("html")[0];
		if (!_opened) {
			html.classList.remove(styles.preventScroll);
		} else {
			html.classList.add(styles.preventScroll);
		}
		setOpened(_opened);
	};

	return (
		<section className={classNames.join(" ")}>
			<div className={styles.overlay} onClick={toggleOpen} />
			<button onClick={toggleOpen}>
				<Menu aria-label="Menu" className={styles.open} />
				<X aria-label={t("Close Menu")} className={styles.close} />
			</button>
			<nav>
				<ul className={styles.links}>
					<li>
						<Link href="cart">
							<a>
								<Cart /> <span>{t("Cart")}</span>
							</a>
						</Link>
					</li>
					<li>
						<Link href="favorites">
							<a>
								<Star /> <span>{t("Favorites")}</span>
							</a>
						</Link>
					</li>
					<li>
						<Link href="credits">
							<a>
								<Megaphone /> <span>{t("Credits")}</span>
							</a>
						</Link>
					</li>
				</ul>
			</nav>
		</section>
	);
};

export default Navigation;
