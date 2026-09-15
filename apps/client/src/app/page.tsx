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

// 경계가 없으면 가장 느린 섹션이 끝날 때까지 첫 바이트가 나가지 않습니다.
export default function Home() {
	return (
		<div className={s.page}>
			<h1 className={s.mobileHeading}>대학 생활에 필요한 툴을 다루다</h1>
			<HeroSection />

			<div className={s.content}>
				<AdBannerSection banners={AD_BANNERS} className={s.fullBleed} />
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
