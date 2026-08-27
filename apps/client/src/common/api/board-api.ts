import { fetchServer } from "./fetch-server";
import type { BoardItem, BoardListRes, GetBoardListParams } from "./models/board.model";

// TODO: fetch의 next: { tags } 방식은 Next.js 15/16에서 여전히 동작하지만,
// 향후 "use cache" directive + cacheTag() + cacheLife()로 마이그레이션
// 관련 액션(board.actions.ts, comment-actions.ts)의 updateTag()는 두 방식 모두 호환

/**
 * @description /api/v1/board 엔드포인트와 통신하는 API 서비스입니다.
 */
export const BoardApi = {
	/**
	 * @description 게시글 리스트 조회 (자유게시판, 툴별게시판, 페이지네이션 완전 지원)
	 */
	getBoardList: async (params: GetBoardListParams = {}) => {
		const { noTopic, toolId, size = 10, lastBoardId, sortBy, lastScrapCount } = params;

		const queryParams = new URLSearchParams({
			size: String(size),
		});

		if (noTopic !== undefined) queryParams.append("noTopic", String(noTopic));
		if (toolId !== undefined) queryParams.append("toolId", String(toolId));
		if (lastBoardId !== undefined) queryParams.append("lastBoardId", String(lastBoardId));
		if (sortBy !== undefined) queryParams.append("sortBy", sortBy);
		if (lastScrapCount !== undefined) queryParams.append("lastScrapCount", String(lastScrapCount));

		const query = queryParams.toString();

		const cacheTags = toolId ? [`tool-${toolId}-boards`] : ["all-boards"];

		return fetchServer<BoardListRes>(`/api/v1/board?${query}`, {
			next: { tags: cacheTags },
		});
	},

	/**
	 * @description 게시글 상세 조회
	 */
	getBoardDetail: async (boardId: number) => {
		return fetchServer<BoardItem>(`/api/v1/board/${boardId}`, {
			next: { tags: [`board-${boardId}`] },
		});
	},
};
