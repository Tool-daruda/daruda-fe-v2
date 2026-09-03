import Image from "next/image";
import Link from "next/link";
import type { ToolSummary } from "@/common/api/models/tool.model";
import ToolCard from "@/common/components/tool-card/tool-card";
import type { PriceType } from "@/common/constants/price";
import * as s from "../styles/search-page.css";

// 검색 API는 툴 목록 API와 달리 라이선스를 한글 라벨이 아닌 서버 enum으로 내려준다.
const SEARCH_LICENSE_MAP: Record<string, PriceType> = {
	FREE: "free",
	PAID: "paid",
	PARTIALLY_FREE: "partial",
};

interface ToolSearchResultsProps {
	tools: ToolSummary[];
}

export function ToolSearchResults({ tools }: ToolSearchResultsProps) {
	return (
		<section className={s.toolSection}>
			<div className={s.sectionHeader}>
				<Image src="/icons/ic_search_toollist_24.svg" alt="" width={24} height={24} />
				<h2 className={s.sectionTitle}>툴 리스트</h2>
			</div>

			{tools.length === 0 ? (
				<div className={s.emptySection}>
					<div className={s.emptyTextGroup}>
						<p className={s.emptyTitle}>키워드와 연관된 툴이 존재하지 않아요.</p>
						<p className={s.emptyDescription}>원하는 툴이 있다면, 다루다에게 요청해 보세요.</p>
					</div>
					<Link href="/contact" className={s.toolRequestButton}>
						다루다에게 툴 요청하기
					</Link>
				</div>
			) : (
				<div className={s.toolGrid}>
					{tools.map((tool) => (
						<ToolCard
							key={tool.toolId}
							toolId={tool.toolId}
							title={tool.toolName}
							thumbnailUrl={tool.toolLogo}
							description={tool.description}
							priceType={SEARCH_LICENSE_MAP[tool.license]}
							tags={tool.keywords}
							variant="horizontal"
							href={`/toollist/${tool.toolId}`}
						/>
					))}
				</div>
			)}
		</section>
	);
}
