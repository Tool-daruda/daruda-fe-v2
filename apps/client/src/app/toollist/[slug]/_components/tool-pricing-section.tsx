import { ToolApi } from "@/common/api/tool-api";
import * as styles from "./styles/tool-pricing-section.css";
import { ToolPricingContent } from "./tool-pricing-content";

type Props = {
	toolId: number;
};

export const ToolPricingSection = async ({ toolId }: Props) => {
	const plansData = await ToolApi.getToolPlans(toolId).catch(() => null);

	if (!plansData || !plansData.toolPlans || plansData.toolPlans.length === 0) {
		return null;
	}

	return (
		<section className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>합리적인 플랜을 선택해 보세요</h2>
				<p className={styles.description}>자세한 내용은 플랜별 설명을 확인해 주세요.</p>
			</div>

			<ToolPricingContent toolPlans={plansData.toolPlans} />
		</section>
	);
};
