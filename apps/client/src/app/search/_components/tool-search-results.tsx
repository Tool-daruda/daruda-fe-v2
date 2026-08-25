import type { ToolSummary } from "@/common/api/models/tool.model";
import ToolCard from "@/common/components/tool-card/tool-card";
import { type ApiLicenseType, LICENSE_MAP } from "@/common/constants/price";
import * as s from "../styles/search-page.css";

interface ToolSearchResultsProps {
	tools: ToolSummary[];
	keyword: string;
}

export function ToolSearchResults({ tools, keyword }: ToolSearchResultsProps) {
	if (!keyword.trim()) return null;

	return (
		<section className={s.sectionContainer}>
			<div className={s.sectionHeader}>
				<h2 className={s.sectionTitle}>툴</h2>
				<span className={s.sectionCountChip}>{tools.length}</span>
			</div>

			{tools.length === 0 ? (
				<div className={s.emptySection}>
					<p className={s.emptyTitle}>&apos;{keyword}&apos;에 대한 툴 검색 결과가 없습니다.</p>
				</div>
			) : (
				<div className={s.toolGrid}>
					{tools.map((tool) => {
						const priceType = LICENSE_MAP[tool.license as ApiLicenseType] || tool.license;
						return (
							<ToolCard
								key={tool.toolId}
								toolId={tool.toolId}
								title={tool.toolName}
								thumbnailUrl={tool.toolLogo}
								description={tool.description}
								priceType={priceType as "free" | "paid" | "partial"}
								isBookmarked={tool.isScraped}
								tags={tool.keywords}
								variant="horizontal"
								href={`/toollist/${tool.toolId}`}
							/>
						);
					})}
				</div>
			)}
		</section>
	);
}
