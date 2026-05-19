import { postToolScrapAction } from "@/app/toollist/_actions/tool-actions";
import ToolCard from "@/common/components/tool-card/tool-card";
import type { PriceType } from "@/common/constants/price";
import * as styles from "./favoriteTools.css";

const DUMMY_TOOLS = Array.from({ length: 15 }).map((_, idx) => {
	const types: PriceType[] = ["paid", "free", "partial"];
	const type = types[idx % 3];

	return {
		id: idx,
		title: idx % 2 === 0 ? "Adobe Lightroom Classic" : "Obsidian",
		description: "문서 작성과 요약, 아이디어 정리에 유용한 디지털 툴입니다.",
		thumbnailUrl: "/icons/img_bg_darudalogo_228.png",
		tags: ["데이터", "생산성"],
		priceType: type,
		isBookmarked: true,
		badgeType: idx % 5 === 0 ? ("hot" as const) : idx % 5 === 1 ? ("new" as const) : undefined,
	};
});

export default function FavoriteToolsPage() {
	return (
		<div className={styles.gridContainer}>
			{DUMMY_TOOLS.map((tool) => (
				<ToolCard
					key={tool.id}
					title={tool.title}
					description={tool.description}
					thumbnailUrl={tool.thumbnailUrl}
					tags={tool.tags}
					priceType={tool.priceType}
					isBookmarked={tool.isBookmarked}
					badgeType={tool.badgeType}
					variant="horizontal"
					onBookmarkClick={postToolScrapAction.bind(null, tool.id)}
				/>
			))}
		</div>
	);
}
