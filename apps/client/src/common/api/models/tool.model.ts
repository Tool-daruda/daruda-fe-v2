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
