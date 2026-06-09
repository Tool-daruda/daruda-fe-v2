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
	toolId: number;
};

export const ToolDetailPage = ({ toolId }: Props) => {
	return (
		<div className={styles.page}>
			<section className={styles.header}>
				<ToolHero toolId={toolId} />
				<ToolMetaBar toolId={toolId} />
			</section>

			<div className={styles.contentLayout}>
				<aside className={styles.sidebarArea}>
					<ToolSidebar toolId={toolId} />
				</aside>

				<main className={styles.mainArea}>
					<ToolIntroSection toolId={toolId} />
					<ToolFeatureGrid toolId={toolId} />
					<ToolVideoSection toolId={toolId} />
					<ToolPricingSection toolId={toolId} />
					<ToolUseCaseSection toolId={toolId} />
					<ToolRelatedPostSection toolId={toolId} />
					<ToolFeedbackSection />
				</main>
			</div>
		</div>
	);
};
