import * as styles from "./tool-card.css";

interface ToolCardProps {
	toolId: number;
	toolLogo: string;
	toolName: string;
	description: string;
	category: string;
	updatedAt: string;
}

const ToolCard = ({
	toolId,
	toolLogo,
	toolName,
	description,
	category,
	updatedAt,
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
				{/* TODO: 공통 컴포넌트 제작후 <Button>로 변경 */}
				<button type="button" className={styles.editButton}>
					편집
				</button>
			</div>
		</section>
	);
};

export default ToolCard;
