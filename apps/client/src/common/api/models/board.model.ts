export type BoardSortBy = "LATEST" | "SCRAP";

export interface GetBoardListParams {
	noTopic?: boolean;
	toolId?: number;
	size?: number;
	lastBoardId?: number;
	sortBy?: BoardSortBy;
	lastScrapCount?: number;
}

export interface BoardItem {
	boardId: number;
	toolName: string;
	toolLogo: string;
	author: string;
	title: string;
	content: string;
	images: string[];
	isScraped: boolean;
	toolId: number | null;
	updatedAt: string;
	commentCount: number;
	scrapCount: number;
}

export interface BoardListRes {
	contents: BoardItem[];
	scrollPaginationDto: {
		totalElements: number;
		// 다음 페이지가 없으면 -1
		nextCursor: number;
	};
	// SCRAP 정렬에서만 내려온다. 0도 유효한 커서 값이므로 null 체크로만 판단해야 한다.
	nextScrapCount: number | null;
}

export interface BoardScrapRes {
	boardId: number;
	scrap: boolean;
}

export interface BoardWriteReq {
	title: string;
	content: string;
	imageList: string[];
	toolId?: number;
	isFree: boolean;
}

export interface BoardWriteRes {
	boardId: number;
}
