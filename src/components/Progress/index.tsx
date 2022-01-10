import styles from "./Progress.module.scss";

export const Progress: React.FC<{ current: number; total: number }> = ({
	current,
	total,
}) => {
	return (
		<p className={styles.progress}>
			<span>{current}</span>
			<span>/</span>
			<span>{total}</span>
		</p>
	);
};
