import { X } from "@styled-icons/boxicons-regular";
import { useCallback, useEffect } from "react";
import styles from "./Page.module.scss";

interface Props {
	closeFunction: CallableFunction;
	title?: string;
}
export const PageOverlay: React.FC<Props> = ({
	closeFunction,
	title,
	children,
}) => {
	useEffect(() => {
		const body = document.getElementsByTagName('html')[0];
		body.classList.add(styles.preventScroll)
		return () => {
			body.classList.remove(styles.preventScroll);
		};
	});

	return (
		<div className={styles.overlay}>
			<div className={styles.window}>
				<header>
					{title && <h2>{title}</h2>}
					<button
						className={styles.close}
						onClick={(e) => {
							e.preventDefault();
							closeFunction();
						}}
					>
						<X size={30} />
					</button>
				</header>
				<div className={styles.content}>{children}</div>
			</div>
		</div>
	);
};

export default PageOverlay;
