import {
	Confused,
	Happy,
	HappyBeaming,
	Meh,
	MehBlank,
	Sad,
	Store,
} from "@styled-icons/boxicons-regular";
import React, { MouseEventHandler, useCallback, useState } from "react";
import { ISeller } from "../../lib/interfaces/ISeller";
import PageOverlay from "../Page/PageOverlay";
import styles from "./Seller.module.scss";

export const SellerViewButton: React.FC<{ seller: ISeller }> = ({ seller }) => {
	const { seller_reputation, registration_date } = seller;
	const { ratings, completed } = seller_reputation.transactions;
	const ratingPercentage = Math.round(ratings.positive * 100);

	const date = new Date(registration_date);
	const sellerRegistrationFormatted = `${("0" + date.getMonth()).slice(
		-2
	)}/${date.getFullYear()}`;

	const hash = "#seller-details";

	return (
		<>
			<a className={styles.button} href={hash}>
				<Store size={24} />
				<span>
					Vendido por <strong>{seller.nickname}</strong>
				</span>
			</a>
			<PageOverlay title={seller.nickname} hash={hash}>
				<div className={styles.content}>
					<section className={styles.rating}>
						<section className={styles.ratingLevel}>
							<SellerRatingLevel level={ratingPercentage} />
						</section>

						<hr />

						<section className={styles.percentage}>
							<p>
								<strong>{ratingPercentage}</strong>
								<sup>%</sup>
							</p>
							<p>
								<span>avaliações positivas</span>
							</p>
						</section>
					</section>
					<p>
						Cadastrado em <strong>{sellerRegistrationFormatted}</strong>
					</p>
					<p>
						Quantidade de vendas <strong>{completed.toLocaleString()}</strong>
					</p>
				</div>
			</PageOverlay>
		</>
	);
};

const SellerRatingLevel: React.FC<{ level: number }> = ({ level }) => {
	const size = 44;
	let text = "Não definido.";
	let icon = <MehBlank size={size} className={styles.noRating} />;
	if (level !== undefined) {
		if (level > 80) {
			icon = <HappyBeaming size={size} className={styles.rating5} />;
			text = "Excelente!";
		} else if (level > 60) {
			icon = <Happy size={size} className={styles.rating4} />;
			text = "Bom.";
		} else if (level > 40) {
			icon = <Meh size={size} className={styles.rating3} />;
			text = "Regular.";
		} else if (level > 20) {
			icon = <Confused size={size} className={styles.rating2} />;
			text = "Irregular.";
		} else {
			icon = <Sad size={size} className={styles.rating1} />;
			text = "Ruim.";
		}
	}

	return (
		<>
			<div className={styles.icon}>{icon}</div>
			<p>{text}</p>
		</>
	);
};

export default SellerViewButton;
