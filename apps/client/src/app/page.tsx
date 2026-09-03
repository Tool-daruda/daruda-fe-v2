import { Suspense } from "react";
import { AdBannerSection } from "@/common/components/ad-banner/ad-banner-section";
import { AD_BANNERS } from "@/common/constants/ad-banners";
import { FreeToolsSection } from "./(main)/_components/free-tools-section";
import { HeroSection } from "./(main)/_components/hero-section";
import { PopularPostsSection } from "./(main)/_components/popular-posts-section";
import { PopularToolsSection } from "./(main)/_components/popular-tools-section";
import { RecentToolsSection } from "./(main)/_components/recent-tools-section";
import { PostGridSkeleton, ToolRowSkeleton } from "./(main)/_components/section-skeleton";
import * as s from "./page-style.css";

// 섹션마다 Suspense로 끊어야 셸이 먼저 나갑니다.
// 경계가 없으면 가장 느린 섹션이 끝날 때까지 첫 바이트가 나가지 않습니다.
export default function Home() {
	return (
		<div className={s.page}>
			{/* 히어로는 제목·검색폼이 LCP라 감싸지 않습니다. 안에서 카테고리 칩만 스트리밍합니다. */}
			<HeroSection />

			<div className={s.content}>
				<AdBannerSection banners={AD_BANNERS} />

				<div className={s.sections}>
					<Suspense fallback={<ToolRowSkeleton />}>
						<PopularToolsSection />
					</Suspense>
					<Suspense fallback={<ToolRowSkeleton />}>
						<FreeToolsSection />
					</Suspense>
					<Suspense fallback={<PostGridSkeleton />}>
						<PopularPostsSection />
					</Suspense>
					<Suspense fallback={<ToolRowSkeleton />}>
						<RecentToolsSection />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
