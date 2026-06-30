import type { CommunityFilterCategory, CommunityHotPost, CommunityListPost } from "../_types";

/**
 * TODO(api): 아래 목데이터는 디자인 구현용 임시 데이터입니다.
 * 다음 스텝에서 BoardApi / ToolApi 연동으로 교체됩니다.
 */

export const MOCK_HOT_HASHTAGS = ["#사용법", "#궁금증", "#오류해결", "#추천", "#단축키"];

export const MOCK_FILTER_CATEGORIES: CommunityFilterCategory[] = [
	{
		name: "AI",
		koreanName: "AI",
		tools: [
			{ toolId: 1, toolName: "ChatGPT" },
			{ toolId: 2, toolName: "Claude" },
			{ toolId: 3, toolName: "Midjourney" },
			{ toolId: 4, toolName: "Notion AI" },
		],
	},
	{
		name: "GRAPHIC_DESIGN",
		koreanName: "그래픽/디자인",
		tools: [
			{ toolId: 5, toolName: "Adobe Illustrator" },
			{ toolId: 6, toolName: "Adobe Photoshop" },
			{ toolId: 7, toolName: "Figma" },
			{ toolId: 8, toolName: "Canva" },
		],
	},
	{
		name: "DATA",
		koreanName: "데이터",
		tools: [
			{ toolId: 9, toolName: "Excel" },
			{ toolId: 10, toolName: "Tableau" },
			{ toolId: 11, toolName: "SPSS" },
		],
	},
	{
		name: "DOCUMENT",
		koreanName: "문서 작성/편집",
		tools: [
			{ toolId: 12, toolName: "Notion" },
			{ toolId: 13, toolName: "MS Word" },
			{ toolId: 14, toolName: "한글" },
		],
	},
	{
		name: "DESIGN_MODELING",
		koreanName: "설계/모델링",
		tools: [
			{ toolId: 15, toolName: "AutoCAD" },
			{ toolId: 16, toolName: "SketchUp" },
		],
	},
	{
		name: "LIFE",
		koreanName: "생활",
		tools: [
			{ toolId: 17, toolName: "Google Calendar" },
			{ toolId: 18, toolName: "Todoist" },
		],
	},
	{
		name: "VIDEO_MUSIC",
		koreanName: "영상/음악",
		tools: [
			{ toolId: 19, toolName: "Premiere Pro" },
			{ toolId: 20, toolName: "Final Cut Pro" },
			{ toolId: 21, toolName: "CapCut" },
		],
	},
	{
		name: "CAREER",
		koreanName: "커리어/자기개발",
		tools: [
			{ toolId: 22, toolName: "LinkedIn" },
			{ toolId: 23, toolName: "Wanted" },
		],
	},
	{
		name: "DEVELOPMENT",
		koreanName: "코딩/개발",
		tools: [
			{ toolId: 24, toolName: "VS Code" },
			{ toolId: 25, toolName: "GitHub" },
			{ toolId: 26, toolName: "IntelliJ" },
		],
	},
	{
		name: "PRESENTATION",
		koreanName: "프레젠테이션",
		tools: [
			{ toolId: 27, toolName: "PowerPoint" },
			{ toolId: 28, toolName: "미리캔버스" },
		],
	},
	{
		name: "COLLABORATION",
		koreanName: "협업/커뮤니케이션",
		tools: [
			{ toolId: 29, toolName: "Slack" },
			{ toolId: 30, toolName: "Zoom" },
			{ toolId: 31, toolName: "Discord" },
		],
	},
];

export const MOCK_HOT_POSTS: CommunityHotPost[] = [
	{ boardId: 1, title: "제목제목제목제목제목제목제목제목", author: "닉네임", date: "2025.01.01" },
	{ boardId: 2, title: "제목제목제목제목제목제목제목제목", author: "닉네임", date: "2025.01.01" },
	{ boardId: 3, title: "제목제목제목제목제목제목제목제목", author: "닉네임", date: "2025.01.01" },
];

const MOCK_POST_BASE: Omit<CommunityListPost, "boardId"> = {
	toolName: "Adobe Illustrator",
	author: "닉네임",
	date: "2025.01.01",
	title: "대학생들이 가장 많이 저장한 글이에요.",
	content:
		"대학생들이 가장 많이 저장한 글이에요대학생들이 가장 많이 저장한 글이에요대학생들이 가장 많이 저장한 글이에요대학생들이 가장 많이 저장한 글이에요대학생들이 가장 많이 저장한 글이에요",
	commentCount: 1,
	scrapCount: 30,
};

export const MOCK_POSTS: CommunityListPost[] = Array.from({ length: 5 }, (_, i) => ({
	...MOCK_POST_BASE,
	boardId: i + 1,
}));
