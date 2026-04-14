import type { ToolDetail } from "../_types";
import * as styles from "./styles/tool-detail-page.css";
import { ToolFeatureGrid } from "./tool-feature-grid";
import { ToolFeedbackSection } from "./tool-feedback-section";
import { ToolHero } from "./tool-hero";
import { ToolIntroSection } from "./tool-intro-section";
import { ToolMetaBar } from "./tool-meta-bar";
import { ToolPricingSection } from "./tool-pricing-section";
import { ToolRelatedPostSection } from "./tool-related-post-section";
import { ToolSidebar } from "./tool-sidebar";
import { ToolUseCaseSection } from "./tool-use-case-section";
import { ToolVideoSection } from "./tool-video-section";

type Props = {
	toolDetail: ToolDetail;
};

export const ToolDetailPage = ({ toolDetail }: Props) => {
	return (
		<div className={styles.page}>
			<ToolHero toolDetail={toolDetail} />
			<ToolMetaBar toolDetail={toolDetail} />

			<div className={styles.contentLayout}>
				<aside className={styles.sidebarArea}>
					<ToolSidebar relatedTools={toolDetail.relatedTools} />
				</aside>

				<main className={styles.mainArea}>
					<ToolIntroSection
						title={toolDetail.name}
						description={toolDetail.description}
						introImages={toolDetail.introImages}
					/>
					<ToolFeatureGrid features={toolDetail.features} />
					<ToolVideoSection items={toolDetail.recommendedVideos} />
					<ToolPricingSection plans={toolDetail.pricingPlans} />
					<ToolUseCaseSection useCases={toolDetail.useCases} />
					<ToolRelatedPostSection posts={toolDetail.relatedPosts} />
					<ToolFeedbackSection />
				</main>
			</div>
		</div>
	);
};
