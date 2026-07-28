import Image from "next/image";
import type { ToolSummary } from "@/common/api/models/tool.model";
import ToolCard from "@/common/components/tool-card/tool-card";
import { type ApiLicenseType, LICENSE_MAP } from "@/common/constants/price";
import * as s from "../styles/search-page.css";

interface ToolSearchResultsProps {
	tools: ToolSummary[];
	keyword: string;
}

export function ToolSearchResults({ tools, keyword }: ToolSearchResultsProps) {
	if (!keyword.trim()) {
		return (
			<div className={s.emptyState}>
				<Image
					src="/icons/ic_search_iris300_20.svg"
					alt=""
					width={48}
					height={48}
					className={s.emptyIcon}
				/>
				<p className={s.emptyTitle}>검색어를 입력해보세요</p>
				<p className={s.emptyDescription}>원하는 디지털 툴의 이름이나 키워드를 검색해보세요.</p>
			</div>
		);
	}

	if (tools.length === 0) {
		return (
			<div className={s.emptyState}>
				<Image
					src="/icons/ic_search_iris300_20.svg"
					alt=""
					width={48}
					height={48}
					className={s.emptyIcon}
				/>
				<p className={s.emptyTitle}>&apos;{keyword}&apos;에 대한 툴 검색 결과가 없습니다</p>
				<p className={s.emptyDescription}>
					단어의 철자가 정확한지 확인하거나 다른 검색어를 입력해보세요.
				</p>
			</div>
		);
	}

	return (
		<div className={s.toolGrid}>
			{tools.map((tool) => {
				const priceType = LICENSE_MAP[tool.license as ApiLicenseType] || tool.license;
				return (
					<ToolCard
						key={tool.toolId}
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
	);
}
