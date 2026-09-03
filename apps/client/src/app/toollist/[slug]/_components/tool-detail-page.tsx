import { Suspense } from "react";
import * as styles from "./styles/tool-detail-page.css";
import { ToolFeatureGrid } from "./tool-feature-grid";
import { ToolFeedbackSection } from "./tool-feedback-section";
import { ToolHero } from "./tool-hero";
import { ToolIntroSection } from "./tool-intro-section";
import { ToolMetaBar } from "./tool-meta-bar";
import { ToolPricingSection } from "./tool-pricing-section";
import { ToolRelatedPostSection } from "./tool-related-post-section";
import { ToolSectionSkeleton } from "./tool-section-skeleton";
import { ToolSidebar } from "./tool-sidebar";
import { ToolUseCaseSection } from "./tool-use-case-section";
import { ToolVideoSection } from "./tool-video-section";

type Props = {
	toolId: number;
};

// 상세만 읽는 섹션들은 page.tsx가 이미 받아온 걸 재사용하므로 기다릴 게 없습니다.
// 자기 조회가 따로 있는 섹션만 Suspense로 끊습니다.
export const ToolDetailPage = ({ toolId }: Props) => {
	return (
		<div className={styles.page}>
			<section className={styles.header}>
				<div className={styles.headerInner}>
					<ToolHero toolId={toolId} />
					<ToolMetaBar toolId={toolId} />
				</div>
			</section>

			<div className={styles.contentLayout}>
				<aside className={styles.sidebarArea}>
					<Suspense fallback={<ToolSectionSkeleton bodyHeight="260px" />}>
						<ToolSidebar toolId={toolId} />
					</Suspense>
				</aside>

				<main className={styles.mainArea}>
					<ToolIntroSection toolId={toolId} />

					<Suspense fallback={<ToolSectionSkeleton bodyHeight="120px" cards={4} />}>
						<ToolFeatureGrid toolId={toolId} />
					</Suspense>

					<ToolVideoSection toolId={toolId} />

					<Suspense fallback={<ToolSectionSkeleton bodyHeight="240px" />}>
						<ToolPricingSection toolId={toolId} />
					</Suspense>

					<Suspense fallback={<ToolSectionSkeleton bodyHeight="160px" />}>
						<ToolUseCaseSection toolId={toolId} />
					</Suspense>

					<Suspense fallback={<ToolSectionSkeleton bodyHeight="200px" />}>
						<ToolRelatedPostSection toolId={toolId} />
					</Suspense>

					<ToolFeedbackSection toolId={toolId} />
				</main>
			</div>
		</div>
	);
};
