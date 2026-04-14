import type { RelatedTool } from "../_types";
import * as styles from "./styles/tool-sidebar.css";

type Props = {
	relatedTools: RelatedTool[];
};

const tocItems = ["툴 소개", "핵심 기능", "참고하면 좋을 영상", "플랜", "툴 활용법", "커뮤니티"];

export const ToolSidebar = ({ relatedTools }: Props) => {
	return (
		<div className={styles.container}>
			<section className={styles.card}>
				<h2 className={styles.cardTitle}>목차</h2>
				<ul className={styles.tocList}>
					{tocItems.map((item, index) => {
						return (
							<li
								key={item}
								className={index === 0 ? styles.activeTocItem : styles.inactiveTocItem}
							>
								{item}
							</li>
						);
					})}
				</ul>
			</section>

			<section className={styles.card}>
				<h2 className={styles.cardTitle}>유사한 기능을 가지고 있는 툴</h2>
				<ul className={styles.relatedList}>
					{relatedTools.map((tool) => {
						return (
							<li key={tool.id} className={styles.relatedItem}>
								<div className={styles.relatedThumb}></div>
							</li>
						);
					})}
				</ul>
			</section>
		</div>
	);
};
