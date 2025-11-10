import type { Platform } from "./types";

export const TOOL_CATEGORY_LIST = [
	{ name: "ALL", koreanName: "전체" },
	{ name: "AI", koreanName: "AI" },
	{ name: "DOCUMENT_EDITING", koreanName: "문서 작성&편집" },
	{ name: "PRESENTATION", koreanName: "프레젠테이션" },
	{ name: "COLLABORATION", koreanName: "협업&커뮤니케이션" },
	{ name: "DATA", koreanName: "데이터" },
	{ name: "GRAPHIC_DESIGN", koreanName: "그래픽&디자인" },
	{ name: "VIDEO_MUSIC", koreanName: "영상&음악" },
	{ name: "CODING", koreanName: "코딩&개발" },
	{ name: "DESIGN_MODELING", koreanName: "설계&모델링" },
	{ name: "LIFESTYLE", koreanName: "생활" },
	{ name: "CAREER_DEVELOPMENT", koreanName: "커리어&자기개발" },
] as const;

const categoryMap = new Map(TOOL_CATEGORY_LIST.map((item) => [item.name, item.koreanName]));
export const getKoreanCategoryName = (categoryName: string): string => {
	return (
		categoryMap.get(categoryName as (typeof TOOL_CATEGORY_LIST)[number]["name"]) || categoryName
	);
};

export const TOOL_CATEGORY_OPTIONS = TOOL_CATEGORY_LIST.filter(
	(category) => category.name !== "ALL"
).map((category) => ({
	value: category.name,
	label: category.koreanName,
}));

export const LICENSE_OPTIONS: { value: string; label: string }[] = [
	{ value: "FREE", label: "무료" },
	{ value: "PARTIALLY_FREE", label: "부분 유료" },
	{ value: "PAID", label: "유료" },
] as const;

export const PLATFORM_OPTIONS: { name: keyof Platform; label: string }[] = [
	{ name: "supportWeb", label: "Web" },
	{ name: "supportWindows", label: "Windows" },
	{ name: "supportMac", label: "Mac" },
] as const;

export const PLAN_TYPE_OPTIONS: { value: string; label: string }[] = [
	{ value: "FREE", label: "무료" },
	{ value: "MONTHLY", label: "구매" },
	{ value: "PURCHASE", label: "월간" },
	{ value: "MONTHLY_ANNUAL", label: "월간 & 연간" },
] as const;

const _req = {
	toolMainName: "daruda",
	toolSubName: "다루다",
	toolLink: "https://www.daruda.site/?category=ALL",
	description:
		"다루다한줄소개다루다한줄소개다루다한줄소개다루다한줄소개다루다한줄소개다루다한줄소개다루다한줄소개다루다한줄소개다루다한줄소개다루다한줄소개다루다한줄소개다루다한줄소개다루다한줄소개다루다한줄소개",
	license: "무료",
	supportKorea: true,
	detailDescription: "다러나어람넝라ㅓㄴ",
	planLink: "https://www.daruda.site/?category=ALL",
	toolLogo: "https://daruda.s3.ap-northeast-2.amazonaws.com/ic_darudalogo.svg",
	images: ["https://daruda.s3.ap-northeast-2.amazonaws.com/ic_add.svg"],
	toolPlatForm: {
		supportWeb: true,
		supportWindows: false,
		supportMac: false,
	},
	relatedToolIds: [5, 30],
	keywords: ["다루다"],
	cores: [
		{
			coreName: "기능1",
			coreContent: "기능기능",
		},
		{
			coreName: "기능2",
			coreContent: "기능기능",
		},
	],
	plans: [
		{
			planName: "구매",
			description: "돈돈돈ㄷ내놔",
			priceMonthly: 40,
			priceAnnual: 480,
			isDollar: false,
		},
	],
	videos: ["https://www.daruda.site/?category=ALL"],
	blogLinks: ["https://www.daruda.site/?category=ALL"],
	category: "데이터",
};
