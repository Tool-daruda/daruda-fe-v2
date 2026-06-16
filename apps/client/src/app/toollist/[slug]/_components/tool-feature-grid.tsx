import { ToolApi } from "@/common/api/tool-api";
import * as styles from "./styles/tool-feature-grid.css";

type Props = {
	toolId: number;
};

export const ToolFeatureGrid = async ({ toolId }: Props) => {
	const featuresData = await ToolApi.getToolCoreFeatures(toolId).catch(() => null);
	const featureList = featuresData?.toolCoreResList ?? [];

	if (featureList.length === 0) return null;

	return (
		<section className={styles.container}>
			<h2 className={styles.title}>이런 기능이 있어요</h2>

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
		</section>
	);
};
