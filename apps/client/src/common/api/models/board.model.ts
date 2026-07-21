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
	toolId: number;
	updatedAt: string;
	commentCount: number;
}

export interface BoardListRes {
	contents: BoardItem[];
	scrollPaginationDto: {
		totalElements: number;
		nextCursor: number;
	};
	nextScrapCount: number;
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
	noTopic: boolean;
}

export interface BoardWriteRes {
	boardId: number;
}
