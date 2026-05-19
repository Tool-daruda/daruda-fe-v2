export interface ToolSummary {
	toolId: number;
	toolName: string;
	toolLogo: string;
	description: string;
	license: "부분 유료" | "무료" | "유료";
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
