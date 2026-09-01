import type { FromSpec, Schemas } from "@repo/api-types/helpers";

export type BoardSortBy = "LATEST" | "SCRAP";

export interface GetBoardListParams {
	noTopic?: boolean;
	toolId?: number;
	size?: number;
	lastBoardId?: number;
	sortBy?: BoardSortBy;
	lastScrapCount?: number;
}

// 자유 게시글에는 툴이 붙지 않습니다.
export type BoardItem = FromSpec<"BoardResponse", { toolId: number | null }>;

// nextCursor는 다음 페이지가 없으면 -1이 내려옵니다.
export type ScrollPagination = FromSpec<"ScrollPaginationDto">;

export type BoardListRes = FromSpec<
	"GetBoardResponse",
	{
		contents: BoardItem[];
		// SCRAP 정렬에서만 내려온다. 0도 유효한 커서 값이므로 null 체크로만 판단해야 한다.
		nextScrapCount: number | null;
	}
>;

export type BoardScrapRes = FromSpec<"BoardScrapResponse">;

export type BoardWriteReq = Schemas["BoardCreateAndUpdateRequest"];

// 작성·수정 응답은 게시글 전체를 주지만 화면에서는 이동할 id만 씁니다.
export type BoardWriteRes = Pick<BoardItem, "boardId">;
