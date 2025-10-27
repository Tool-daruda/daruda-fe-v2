import { Button } from "../button";
import * as styles from "./tool-card.css";

interface ToolCardProps {
	toolId: number;
	toolLogo: string;
	toolName: string;
	description: string;
	category: string;
	updatedAt: string;
	onClick: () => void;
}

const ToolCard = ({
	toolId,
	toolLogo,
	toolName,
	description,
	category,
	updatedAt,
	onClick,
}: ToolCardProps) => {
	return (
		<section className={styles.card}>
			<div className={styles.cardHead}>
				<span>{toolId}</span>
				<img src={toolLogo} alt={toolName} className={styles.cardLogo} />
			</div>
			<h1 className={styles.cardName}>{toolName}</h1>
			<p className={styles.cardDescription}>{description}</p>
			<span className={styles.cardCategory}>{category}</span>
			<time className={styles.cardUpdatedAt}>{updatedAt}</time>
			<div>
				<Button type="button" intent="tonal" size="sm" onClick={onClick}>
					편집
				</Button>
			</div>
		</section>
	);
};

export default ToolCard;
