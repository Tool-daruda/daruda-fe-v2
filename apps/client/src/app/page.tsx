import { FreeToolsSection } from "./_components/free-tools-section";
import { HeroSection } from "./_components/hero-section";
import { PopularPostsSection } from "./_components/popular-posts-section";
import { PopularToolsSection } from "./_components/popular-tools-section";
import { RecentToolsSection } from "./_components/recent-tools-section";
import * as s from "./page-style.css";

export default function Home() {
	return (
		<div className={s.page}>
			<HeroSection />
			<PopularToolsSection />
			<FreeToolsSection />
			<PopularPostsSection />
			<RecentToolsSection />
		</div>
	);
}
