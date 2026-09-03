import { fetchPublic } from "./fetch-public";
import { fetchServer } from "./fetch-server";
import type { BoardListRes } from "./models/board.model";
import type { SearchBoardParams } from "./models/search.model";
import type { ToolListRes, ToolSummary } from "./models/tool.model";

/**
 * @description /api/v1/search 엔드포인트와 통신하는 API 서비스입니다.
 */
export const SearchApi = {
	/**
	 * @description 툴 검색
	 */
	searchTool: async (keyword: string) => {
		if (!keyword.trim()) return [];
		const query = new URLSearchParams({ keyword: keyword.trim() }).toString();
		// 툴 목록과 같은 이유로 공개 fetcher를 씁니다. 쿠키를 실은 채 캐시하면
		// 사용자별로 캐시 엔트리가 갈라져 캐시가 사실상 동작하지 않습니다.
		return fetchPublic<ToolSummary[] | ToolListRes>(`/api/v1/search/tool?${query}`, {
			cache: "force-cache",
			next: { revalidate: 60, tags: ["search-tool"] },
		});
	},

	/**
	 * @description 게시글 검색 (커서 기반 무한스크롤)
	 */
	searchBoard: async (params: SearchBoardParams) => {
		const { keyword, nextCursor, size = 10 } = params;
		if (!keyword.trim()) {
			return {
				contents: [],
				scrollPaginationDto: { totalElements: 0, nextCursor: 0 },
				nextScrapCount: 0,
			} as BoardListRes;
		}

		const queryParams = new URLSearchParams({
			keyword: keyword.trim(),
			size: String(size),
		});

		if (nextCursor !== undefined && nextCursor !== null && nextCursor !== "") {
			queryParams.append("nextCursor", String(nextCursor));
		}

		return fetchServer<BoardListRes>(`/api/v1/search/board?${queryParams.toString()}`, {
			next: { revalidate: 60, tags: ["search-board"] },
		});
	},
};
