import { LocationPlus, X } from "@styled-icons/boxicons-regular";
import { useCallback, useEffect, useState } from "react";
import styles from "./Page.module.scss";

interface Props {
	hash: string;
	title?: string;
}
export const PageOverlay: React.FC<Props> = ({ title, children, hash }) => {
	const [visible, setVisible] = useState(false);

	const close = useCallback(() => {
		history.back();
	}, []);

	const hashChange = useCallback(() => {
		const _visible = location.hash && location.hash === hash;

		const html = document.getElementsByTagName("html")[0];
		if (!_visible) {
			html.classList.remove(styles.preventScroll);
		} else {
			html.classList.add(styles.preventScroll);
		}

		setVisible(_visible);
	}, []);

	useEffect(() => {
		window.addEventListener("hashchange", hashChange);
		return () => {
			window.removeEventListener("hashchange", hashChange);
		};
	}, []);

	if (!visible) {
		return null;
	}


	return (
		<div className={styles.overlay} onClick={close}>
			<div className={styles.window}>
				<header>
					{title && <h2>{title}</h2>}
					<button
						className={styles.close}
						onClick={(e) => {
							e.preventDefault();
							close();
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
