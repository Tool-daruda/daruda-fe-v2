import { ToolApi } from "@/common/api/tool-api";
import { TOOL_SECTION_IDS } from "../_constants/toc";
import * as styles from "./styles/tool-feature-grid.css";
import { ToolEmptyState } from "./tool-empty-state";

type Props = {
	toolId: number;
};

export const ToolFeatureGrid = async ({ toolId }: Props) => {
	const featuresData = await ToolApi.getToolCoreFeatures(toolId).catch(() => null);
	const featureList = featuresData?.toolCoreResList ?? [];

	return (
		<section id={TOOL_SECTION_IDS.feature} className={styles.container}>
			<h2 className={styles.title}>이런 기능이 있어요</h2>

			{featureList.length === 0 ? (
				<ToolEmptyState message="아직 등록된 핵심 기능이 없어요." />
			) : (
				<div className={styles.grid}>
					{featureList.map((feature) => {
						const number = String(feature.coreId).padStart(2, "0");

						return (
							<article key={feature.coreId} className={styles.card}>
								<div className={styles.cardHeader}>
									<p className={styles.number}>{number}</p>
									<h3 className={styles.cardTitle}>{feature.coreTitle}</h3>
								</div>
								<p className={styles.cardDescription}>{feature.coreContent}</p>
							</article>
						);
					})}
				</div>
			)}
		</section>
	);
};
