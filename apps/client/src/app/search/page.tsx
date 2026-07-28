import { Suspense } from "react";
import type { BoardItem } from "@/common/api/models/board.model";
import {
	normalizeBoardSearchResponse,
	normalizeToolSearchResponse,
	type SearchTab,
} from "@/common/api/models/search.model";
import type { ToolSummary } from "@/common/api/models/tool.model";
import { SearchApi } from "@/common/api/search-api";
import { BoardSearchResults } from "./_components/board-search-results";
import { SearchHeader } from "./_components/search-header";
import { SearchTabs } from "./_components/search-tabs";
import { ToolSearchResults } from "./_components/tool-search-results";
import * as s from "./styles/search-page.css";

interface SearchPageProps {
	searchParams: Promise<{
		keyword?: string;
		tab?: string;
	}>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const resolvedSearchParams = await searchParams;
	const keyword = (resolvedSearchParams.keyword || "").trim();
	const activeTab: SearchTab = resolvedSearchParams.tab === "community" ? "community" : "tool";

	let tools: ToolSummary[] = [];
	let boardContents: BoardItem[] = [];
	let boardNextCursor: number | string | null = null;
	let toolCount: number | undefined;
	let communityCount: number | undefined;

	if (keyword) {
		if (activeTab === "tool") {
			const toolRes = await SearchApi.searchTool(keyword).catch(() => null);
			tools = normalizeToolSearchResponse(toolRes);
			toolCount = tools.length;
		} else {
			const boardRes = await SearchApi.searchBoard({ keyword, size: 10 }).catch(() => null);
			const normalizedBoard = normalizeBoardSearchResponse(boardRes);
			boardContents = normalizedBoard.contents;
			boardNextCursor = normalizedBoard.nextCursor;
			communityCount = normalizedBoard.totalElements ?? boardContents.length;
		}
	}

	return (
		<>
			<Suspense fallback={null}>
				<SearchHeader initialKeyword={keyword} activeTab={activeTab} />
			</Suspense>

			<main className={s.container}>
				<Suspense fallback={null}>
					<SearchTabs activeTab={activeTab} toolCount={toolCount} communityCount={communityCount} />
				</Suspense>

				<section className={s.contentArea}>
					<Suspense
						fallback={
							<div className={s.loadingTrigger}>
								<div className={s.spinner} />
							</div>
						}
					>
						{activeTab === "tool" ? (
							<ToolSearchResults tools={tools} keyword={keyword} />
						) : (
							<BoardSearchResults
								initialPosts={boardContents}
								initialNextCursor={boardNextCursor}
								keyword={keyword}
							/>
						)}
					</Suspense>
				</section>
			</main>
		</>
	);
}
