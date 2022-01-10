import { X } from "@styled-icons/boxicons-regular";
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
	return (
		<div className={styles.overlay}>
			<div className={styles.window}>
				<header>
					{title && <h2>{title}</h2>}
					<button className={styles.close} onClick={(e) => {
						e.preventDefault();
						closeFunction();
					}}>
						<X size={30} />
					</button>
				</header>
				<div className={styles.content}>{children}</div>
			</div>
		</div>
	);
};

export default PageOverlay;
