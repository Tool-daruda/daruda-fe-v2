import type { ApiLicenseType } from "@/common/constants/price";

export interface ToolSummary {
	toolId: number;
	toolName: string;
	toolLogo: string;
	description: string;
	license: ApiLicenseType;
	keywords: string[];
	isScrapped: boolean;
}

export interface ToolListRes {
	tools: ToolSummary[];
	hasNext: boolean;
}

export interface CategoryRes {
	name: string;
	koreanName: string;
}

export type ToolDetailGetRes = {};

export interface ToolScrapRes {
	toolId: number;
	scrap: boolean;
}

export type FavoriteTool = {
	toolId: number;
	toolName: string;
	toolLogo: string;
	description: string;
	license: ApiLicenseType;
	keywords: string[];
	isScraped: boolean;
};

export interface FavoriteToolsRes {
	toolList: FavoriteTool[];
}

export type MyBoardItem = {
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
};

export type PageInfo = {
	pageNo: number;
	size: number;
	totalPages: number;
};

export interface MyBoardsRes {
	boardList: MyBoardItem[];
	userId: number;
	pageInfo: PageInfo;
}
