import React from "react";
import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";
import variables from "../../styles/variables.module.scss";
import Page from "../Page";
import styles from "./Loading.module.scss";
export interface LoadingProps {
	size?: 'small' | 'medium';
	speed?: number;
}
export const Loading: React.FC<LoadingProps> = ({ size = 'small', speed = 1 }) => {
	const resolvedSize = size === 'medium' ? 56 : 32;
	return (
		<>
			<Spinner
				color={variables.palleteNeutralDark}
				size={resolvedSize}
				speed={speed}
				animating={true}
			/>
		</>
	);
};

export const LoadingCentered: React.FC<LoadingProps> = (props) => {
	return (
		<div className={styles.centered}>
			<Loading {...props} />
		</div>
	)
}

export const LoadingPage: React.FC<LoadingProps> = ({ size = 'medium', ...props}) => {
	return (
		<Page>
			<div className={styles.centeredPage}>
				<Loading size={size} {...props} />
			</div>
		</Page>
	);
};
export default Loading;
