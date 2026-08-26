import { AdBannerSection } from "@/common/components/ad-banner/ad-banner-section";
import { AD_BANNERS } from "@/common/constants/ad-banners";
import { FreeToolsSection } from "./(main)/_components/free-tools-section";
import { HeroSection } from "./(main)/_components/hero-section";
import { PopularPostsSection } from "./(main)/_components/popular-posts-section";
import { PopularToolsSection } from "./(main)/_components/popular-tools-section";
import { RecentToolsSection } from "./(main)/_components/recent-tools-section";
import * as s from "./page-style.css";

export default function Home() {
	return (
		<div className={s.page}>
			<HeroSection />

			<div className={s.content}>
				<AdBannerSection banners={AD_BANNERS} />

				<div className={s.sections}>
					<PopularToolsSection />
					<FreeToolsSection />
					<PopularPostsSection />
					<RecentToolsSection />
				</div>
			</div>
		</div>
	);
}
