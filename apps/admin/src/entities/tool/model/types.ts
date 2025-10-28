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
	fontColor: boolean;
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

// 툴 카드
export type ToolCardType = {
	toolId: number;
	toolLogo: string;
	toolName: string;
	description: string;
	category: string;
	createdAt: string;
};
