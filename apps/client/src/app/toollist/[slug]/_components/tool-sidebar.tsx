import { ToolApi } from "@/common/api/tool-api";
import * as styles from "./styles/tool-sidebar.css";
import { ToolAlternativesList } from "./tool-alternatives-list";

type Props = {
	toolId: number;
};

const tocItems = ["툴 소개", "핵심 기능", "참고하면 좋을 영상", "플랜", "툴 활용법", "커뮤니티"];

export const ToolSidebar = async ({ toolId }: Props) => {
	const alternativesData = await ToolApi.getToolAlternatives(toolId).catch(() => null);
	const relatedTools = alternativesData?.relatedToolResList ?? [];

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

			{relatedTools.length > 0 && (
				<section className={styles.card}>
					<h2 className={styles.cardTitle}>유사한 기능을 가지고 있는 툴</h2>
					<ul className={styles.relatedList}>
						<ToolAlternativesList relatedTools={relatedTools} />
					</ul>
				</section>
			)}
		</div>
	);
};
