import { ToolApi } from "@/common/api/tool-api";
import { TOOL_SECTION_IDS } from "../_constants/toc";
import * as styles from "./styles/tool-pricing-section.css";
import { ToolEmptyState } from "./tool-empty-state";
import { ToolPricingContent } from "./tool-pricing-content";

type Props = {
	toolId: number;
};

export const ToolPricingSection = async ({ toolId }: Props) => {
	const plansData = await ToolApi.getToolPlans(toolId).catch(() => null);
	const toolPlans = plansData?.toolPlans ?? [];

	return (
		<section id={TOOL_SECTION_IDS.pricing} className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>합리적인 플랜을 선택해 보세요</h2>
				<p className={styles.description}>자세한 내용은 플랜별 설명을 확인해 주세요.</p>
			</div>

			{toolPlans.length === 0 ? (
				<ToolEmptyState message="아직 등록된 플랜 정보가 없어요." />
			) : (
				<ToolPricingContent toolPlans={toolPlans} />
			)}
		</section>
	);
};
