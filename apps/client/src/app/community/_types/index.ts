export interface CommunityFilterTool {
	toolId: number;
	toolName: string;
	toolLogo?: string;
}

export interface CommunityFilterCategory {
	name: string;
	koreanName: string;
	tools: CommunityFilterTool[];
}

export interface CommunityHotPost {
	boardId: number;
	title: string;
	author: string;
	date: string;
	thumbnailUrl?: string;
}

export interface CommunityListPost {
	boardId: number;
	toolName: string;
	toolLogo?: string;
	author: string;
	date: string;
	title: string;
	content: string;
	commentCount: number;
	scrapCount: number;
	thumbnailUrl?: string;
}

export type CommunitySortType = "latest" | "scrap";
