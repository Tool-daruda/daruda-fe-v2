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
];

export const TOOL_CATEGORY_OPTIONS = TOOL_CATEGORY_LIST.filter(
	(category) => category.name !== "ALL"
).map((category) => ({
	value: category.name,
	label: category.koreanName,
}));

export const LICENSE_OPTIONS = [
	{ value: "FREE", label: "무료" },
	{ value: "PARTIAL", label: "부분 유료" },
	{ value: "PAID", label: "유료" },
];

export const PLATFORM_OPTIONS: { name: keyof Platform; label: string }[] = [
	{ name: "web", label: "Web" },
	{ name: "windows", label: "Windows" },
	{ name: "mac", label: "Mac" },
];

export const PLAN_TYPE_OPTIONS = [
	{ value: "free", label: "무료" },
	{ value: "purchase", label: "구매" },
	{ value: "monthly", label: "월간" },
	{ value: "subscription", label: "월간&연간" },
];
