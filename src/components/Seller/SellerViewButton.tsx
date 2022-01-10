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
	const [detailsOpened, setDetailsOpened] = useState(false);
	const openDetails = useCallback(() => {
		setDetailsOpened(true);
	}, [seller]);

	const closeDetails = useCallback(() => {
		setDetailsOpened(false);
	}, [seller]);

	let overlay;

	if (detailsOpened) {
		const { seller_reputation, registration_date } = seller;
		const { ratings, completed } = seller_reputation.transactions;
		const ratingPercentage = Math.round(ratings.positive * 100);

		const ratingLevel = seller_reputation.level_id[0];
		const date = new Date(registration_date);

		overlay = (
			<PageOverlay closeFunction={closeDetails} title={seller.nickname}>
				<div className={styles.content}>
					<section className={styles.rating}>
						<section className={styles.ratingLevel}>
							<SellerRatingLevel level={ratingLevel} />
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
						<p>Cadastrado em <strong>{`${("0"+ date.getMonth()).slice(-2)}/${date.getFullYear()}`}</strong></p>
						<p>Quantidade de vendas <strong>{completed.toLocaleString()}</strong></p>
				</div>
			</PageOverlay>
		);
	}

	return (
		<>
			<button
				className={styles.button}
				onClick={(e) => {
					e.preventDefault();
					openDetails();
				}}
			>
				<Store size={24} />
				<span>
					Vendido por <strong>{seller.nickname}</strong>
				</span>
			</button>
			{detailsOpened && overlay}
		</>
	);
};

const SellerRatingLevel: React.FC<{ level: string }> = ({ level }) => {
	const size = 44;
	let text, icon;
	switch (level) {
		case "5":
			icon = <HappyBeaming size={size} className={styles.rating5} />;
			text = "Excelente!";
			break;
		case "4":
			icon = <Happy size={size} className={styles.rating4} />;
			text = 'Bom.';
			break;
		case "3":
			icon = <Meh size={size} className={styles.rating3} />;
			text = 'Regular.';
			break;
		case "2":
			icon = <Confused size={size} className={styles.rating2} />;
			text = 'Irregular.';
			break;
		case "1":
			icon = <Sad size={size} className={styles.rating1} />;
			text = 'Ruim.';
			break;
		default:
			icon = <MehBlank size={size} className={styles.noRating} />;
			text = "Não definido.";
	}
	return (
		<>
			<div className={styles.icon}>{icon}</div>
			<p>{text}</p>
		</>
	);
};

export default SellerViewButton;
