import type { ApiLicenseType } from "@/common/constants/price";

export interface ToolSummary {
	toolId: number;
	toolName: string;
	toolLogo: string;
	description: string;
	license: ApiLicenseType;
	keywords: string[];
	isScraped: boolean;
}

export interface ToolListRes {
	tools: ToolSummary[];
	scrollPaginationDto: {
		totalElements: number;
		nextCursor: number;
	};
}

export interface CategoryRes {
	name: string;
	koreanName: string;
}

export interface ToolScrapRes {
	toolId: number;
	// 서버가 오타 필드명(scarp)으로 내려주고 있습니다. 서버가 바로잡아도 동작하도록 둘 다 받습니다.
	scarp?: boolean;
	scrap?: boolean;
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
	scrapCount: number;
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

export interface ToolDetailRes {
	toolId: number;
	toolLogo: string;
	toolMainName: string;
	toolSubName: string;
	description: string;
	license: string;
	keywords: string[];
	category: string;
	toolLink: string;
	supportKorea: boolean;
	platform: Array<{
		Web: boolean;
		Windows: boolean;
		Mac: boolean;
	}>;
	detailDescription: string;
	videos: string[];
	images: string[];
	updatedAt: string;
	isScrapped: boolean;
	isLiked: boolean;
	likeCount: number;
}

export interface ToolPlanItem {
	planId: number;
	planName: string;
	priceAnnual: number;
	priceMonthly: number;
	description: string;
}

export interface ToolPlanRes {
	planLink: string;
	toolPlans: ToolPlanItem[];
}

export interface ToolCoreFeature {
	coreId: number;
	coreTitle: string;
	coreContent: string;
}
export interface ToolCoreFeaturesRes {
	toolCoreResList: ToolCoreFeature[];
}

export interface ToolBlog {
	blogId: number;
	blogUrl: string;
}
export interface ToolBlogsRes {
	toolBlogs: ToolBlog[];
}

export interface AlternativeTool {
	toolId: number;
	toolName: string;
	toolLogo: string;
	license: string;
	keywords: string[];
}
export interface ToolAlternativesRes {
	relatedToolResList: AlternativeTool[];
}
