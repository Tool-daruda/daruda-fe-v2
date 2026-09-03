import { Suspense } from "react";
import { Skeleton } from "@/common/components/skeleton/skeleton";
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

// ToolHero / ToolMetaBar / ToolIntroSection / ToolVideoSection / ToolFeedbackSection은
// page.tsx가 이미 await한 상세를 요청 메모이제이션으로 재사용하므로 대기가 없습니다.
// 자기 조회가 따로 있는 섹션만 Suspense로 끊어 스트리밍합니다.
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
					<Suspense fallback={<Skeleton height="320px" radius="12px" />}>
						<ToolSidebar toolId={toolId} />
					</Suspense>
				</aside>

				<main className={styles.mainArea}>
					<ToolIntroSection toolId={toolId} />

					<Suspense fallback={<Skeleton height="180px" radius="12px" />}>
						<ToolFeatureGrid toolId={toolId} />
					</Suspense>

					<ToolVideoSection toolId={toolId} />

					<Suspense fallback={<Skeleton height="180px" radius="12px" />}>
						<ToolPricingSection toolId={toolId} />
					</Suspense>

					<Suspense fallback={<Skeleton height="180px" radius="12px" />}>
						<ToolUseCaseSection toolId={toolId} />
					</Suspense>

					<Suspense fallback={<Skeleton height="180px" radius="12px" />}>
						<ToolRelatedPostSection toolId={toolId} />
					</Suspense>

					<ToolFeedbackSection toolId={toolId} />
				</main>
			</div>
		</div>
	);
};
