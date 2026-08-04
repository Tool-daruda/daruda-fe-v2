import { ToolApi } from "@/common/api/tool-api";
import * as styles from "./styles/tool-sidebar.css";
import { ToolAlternativesList } from "./tool-alternatives-list";
import { ToolToc } from "./tool-toc";

type Props = {
	toolId: number;
};

export const ToolSidebar = async ({ toolId }: Props) => {
	const alternativesData = await ToolApi.getToolAlternatives(toolId).catch(() => null);
	const relatedTools = alternativesData?.relatedToolResList ?? [];

	return (
		<div className={styles.container}>
			<section className={styles.card}>
				<h2 className={styles.cardTitle}>목차</h2>
				<ToolToc />
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
