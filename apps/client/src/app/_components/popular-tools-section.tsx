import { ToolApi } from "@/common/api/tool-api";
import ToolCard from "@/common/components/tool-card/tool-card";
import { LICENSE_MAP } from "@/common/constants/price";
import { SectionHeader } from "./section-header";
import * as s from "./tool-row.css";

export const PopularToolsSection = async () => {
	const toolListRes = await ToolApi.getToolList({
		criteria: "popular",
		category: "ALL",
		isFree: false,
		size: 5,
	}).catch(() => null);

	const tools = toolListRes?.tools || [];

	if (tools.length === 0) return null;

	return (
		<section className={s.section}>
			<SectionHeader
				icon="🔥"
				title="대학생들 사이에서 가장 인기있는 툴이에요"
				moreHref="/toollist"
			/>

			<div className={s.row}>
				{tools.map((tool) => (
					<ToolCard
						key={tool.toolId}
						title={tool.toolName}
						thumbnailUrl={tool.toolLogo}
						priceType={LICENSE_MAP[tool.license]}
						isBookmarked={tool.isScrapped}
						tags={tool.keywords}
						badgeType="hot"
						variant="vertical"
						href={`/toollist/${tool.toolId}`}
					/>
				))}
			</div>
		</section>
	);
};
