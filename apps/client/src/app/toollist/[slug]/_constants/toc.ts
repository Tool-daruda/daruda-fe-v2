export const TOOL_SECTION_IDS = {
	intro: "tool-intro",
	feature: "tool-feature",
	video: "tool-video",
	pricing: "tool-pricing",
	useCase: "tool-use-case",
	community: "tool-community",
} as const;

export const TOC_ITEMS = [
	{ id: TOOL_SECTION_IDS.intro, label: "툴 소개" },
	{ id: TOOL_SECTION_IDS.feature, label: "핵심 기능" },
	{ id: TOOL_SECTION_IDS.video, label: "참고하면 좋을 영상" },
	{ id: TOOL_SECTION_IDS.pricing, label: "플랜" },
	{ id: TOOL_SECTION_IDS.useCase, label: "툴 활용법" },
	{ id: TOOL_SECTION_IDS.community, label: "커뮤니티" },
] as const;
