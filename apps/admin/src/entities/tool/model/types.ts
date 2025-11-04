export type Tool = {
	toolMainName: string;
	toolSubName: string;
	category: string;
	toolLink: string;
	description: string;
	license: string;
	supportKorea: boolean;
	detailDescription: string;
	planLink: string;
	bgColor: string;
	fontColor?: boolean;
	toolLogo: string | File;
	platform: Platform;
	keywords: Keyword[];
	cores: Core[];
	plans: Plan[];
	images: (string | File)[];
	videos: Video[];
	relatedToolIds: number[];
	plantype: string; // todo: 백엔드 맞게 수정
	updatedAt?: string;
	relatedTools: SearchTool[];
};

export type Platform = {
	web: boolean;
	windows: boolean;
	mac: boolean;
};

export type Core = {
	coreTitle: string;
	coreContent: string;
};

export type Keyword = {
	value: string;
};

export type Video = {
	videoUrl: string;
};

export type Plan = {
	planName: string;
	priceMonthly: number | null;
	priceAnnual: number | null;
	description: string;
	isDollar: boolean;
};

// 툴 리스트 조회
export type ToolCardType = {
	toolId: number;
	toolLogo: string;
	toolName: string;
	description: string;
	category: string;
	createdAt: string;
};

export interface GetAdminToolsParams {
	page: number;
	size: number;
}

export interface GetAdminToolsRes {
	tools: ToolCardType[];
	totalPages: number;
	totalElements: number;
}

export type PostToolRequest = {
	toolMainName: string;
	toolSubName: string;
	category: string;
	toolLink: string;
	description: string;
	license: string;
	supportKorea: boolean;
	detailDescription: string;
	planLink: string;
	bgColor: string;
	fontColor?: boolean; // true: 검정, false: 흰색

	toolLogo: string;
	platform: Platform;

	keywords: string[];
	cores: Array<{
		coreTitle: string;
		coreContent: string;
	}>;

	plans: Array<{
		planName: string;
		priceMonthly: number | null;
		priceAnnual: number | null;
		description: string;
		isDollar: boolean;
	}>;

	images: string[];
	videos: string[];
	relatedToolIds: number[];
};

// 툴 검색
export type SearchTool = {
	toolId: number;
	toolName: string;
	toolLogo: string;
	description?: string;
	license: string;
	keywords: string[];
	isScraped?: boolean;
	bgColor?: string;
	fontColor?: boolean;
};

// 상세 페이지용 Tool 타입
export interface DetailToolResponse {
	toolMainName: string;
	toolSubName: string;
	category: string;
	toolLink: string;
	supportKorea: boolean;
	detailDescription: string;
	images: string[];
	fontColor: boolean;
	updatedAt: string;
	isScrapped: boolean;
	keywords: string[];
	videos: string[];
	license: string;
	platform: {
		Web: boolean;
		Windows: boolean;
		Mac: boolean;
	}[];
}

// 툴 핵심 기능 타입
export interface CoreFeatureResponse {
	toolCoreResList: ToolCoreFeature[];
}

interface ToolCoreFeature {
	coreId: number;
	coreTitle: string;
	coreContent: string;
}

// 툴 요금제 타입
export interface ToolPlanResponse {
	toolPlans: ToolPlan[];
}

type ToolPlan = {
	price: string | number;
	planId: number;
	planName: string;
	monthlyPrice: number | null;
	annualPrice: number | null;
	description: string;
	isDollar: boolean;
};

// 대안 툴 타입
export interface AlternativeToolResponse {
	relatedToolResList: AlternativeTool[];
}

export interface AlternativeTool {
	toolId: number;
	toolName: string;
	toolLogo: string;
	license: "무료" | "부분 무료" | "유료";
	keywords: string[];
}
