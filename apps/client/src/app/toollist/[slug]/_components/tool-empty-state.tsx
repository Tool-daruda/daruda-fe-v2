import * as styles from "./styles/tool-empty-state.css";

type Props = {
	message: string;
};

export const ToolEmptyState = ({ message }: Props) => {
	return (
		<div className={styles.container}>
			<p className={styles.message}>{message}</p>
		</div>
	);
};
