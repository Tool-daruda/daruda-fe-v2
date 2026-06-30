import { ToolApi } from "@/common/api/tool-api";
import ToolCard from "@/common/components/tool-card/tool-card";
import { LICENSE_MAP } from "@/common/constants/price";
import { SectionHeader } from "./section-header";
import * as s from "./tool-row.css";

export const RecentToolsSection = async () => {
	const toolListRes = await ToolApi.getToolList({
		criteria: "createdAt",
		category: "ALL",
		isFree: false,
		size: 5,
	}).catch(() => null);

	const tools = toolListRes?.tools || [];

	if (tools.length === 0) return null;

	return (
		<section className={s.section}>
			<SectionHeader
				icon="🆕"
				title="최근 daruda에 추가된 툴 정보"
				moreHref="/toollist?criteria=createdAt"
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
						badgeType="new"
						variant="vertical"
						href={`/toollist/${tool.toolId}`}
					/>
				))}
			</div>
		</section>
	);
};
