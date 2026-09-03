import { Suspense } from "react";
import type { BoardItem } from "@/common/api/models/board.model";
import {
	normalizeBoardSearchResponse,
	normalizeToolSearchResponse,
} from "@/common/api/models/search.model";
import type { ToolSummary } from "@/common/api/models/tool.model";
import { SearchApi } from "@/common/api/search-api";
import { BoardSearchResults } from "./_components/board-search-results";
import { SearchHeader } from "./_components/search-header";
import { ToolSearchResults } from "./_components/tool-search-results";
import * as s from "./styles/search-page.css";

interface SearchPageProps {
	searchParams: Promise<{
		keyword?: string;
	}>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const resolvedSearchParams = await searchParams;
	const keyword = (resolvedSearchParams.keyword || "").trim();

	let tools: ToolSummary[] = [];
	let boardContents: BoardItem[] = [];
	let boardNextCursor: number | string | null = null;

	if (keyword) {
		const [toolRes, boardRes] = await Promise.all([
			SearchApi.searchTool(keyword).catch(() => null),
			SearchApi.searchBoard({ keyword, size: 10 }).catch(() => null),
		]);

		tools = normalizeToolSearchResponse(toolRes);

		const normalizedBoard = normalizeBoardSearchResponse(boardRes);
		boardContents = normalizedBoard.contents;
		boardNextCursor = normalizedBoard.nextCursor;
	}

	return (
		<>
			<Suspense fallback={null}>
				<SearchHeader initialKeyword={keyword} />
			</Suspense>

			<div className={s.container}>
				{!keyword ? (
					<div className={s.emptySection}>
						<div className={s.emptyTextGroup}>
							<p className={s.emptyTitle}>검색어를 입력해보세요</p>
							<p className={s.emptyDescription}>
								궁금한 디지털 툴 이름이나 커뮤니티 게시글 검색어를 입력해보세요.
							</p>
						</div>
					</div>
				) : (
					<>
						<p className={s.resultSummary}>
							<span className={s.resultKeyword}>&ldquo;{keyword}&rdquo;</span>
							<span>에 대한 검색결과</span>
						</p>

						<section className={s.contentArea}>
							<Suspense
								fallback={
									<div className={s.loadingTrigger}>
										<div className={s.spinner} />
									</div>
								}
							>
								<ToolSearchResults tools={tools} />
								<BoardSearchResults
									initialPosts={boardContents}
									initialNextCursor={boardNextCursor}
									keyword={keyword}
								/>
							</Suspense>
						</section>
					</>
				)}
			</div>
		</>
	);
}
