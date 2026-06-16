export interface GetBoardListParams {
	noTopic?: boolean;
	toolId?: number;
	size?: number;
	lastBoardId?: number;
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
}
