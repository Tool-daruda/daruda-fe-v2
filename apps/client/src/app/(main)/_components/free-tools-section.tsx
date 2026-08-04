import { ToolApi } from "@/common/api/tool-api";
import ToolCard from "@/common/components/tool-card/tool-card";
import { LICENSE_MAP } from "@/common/constants/price";
import { SectionHeader } from "./section-header";
import * as s from "./tool-row.css";

export const FreeToolsSection = async () => {
	const toolListRes = await ToolApi.getToolList({
		criteria: "popular",
		category: "ALL",
		isFree: true,
		size: 5,
	}).catch(() => null);

	const tools = toolListRes?.tools || [];

	if (tools.length === 0) return null;

	return (
		<section className={s.section}>
			<SectionHeader
				iconSrc="/icons/main/ic_main_free_24.svg"
				title="무료로 사용할 수 있는 툴만 모아봤어요"
				moreHref="/toollist?isFree=true"
			/>

			<div className={s.row}>
				{tools.map((tool) => (
					<ToolCard
						key={tool.toolId}
						title={tool.toolName}
						thumbnailUrl={tool.toolLogo}
						priceType={LICENSE_MAP[tool.license]}
						isBookmarked={tool.isScraped}
						tags={tool.keywords}
						variant="vertical"
						href={`/toollist/${tool.toolId}`}
					/>
				))}
			</div>
		</section>
	);
};
