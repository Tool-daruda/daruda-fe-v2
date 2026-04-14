import type { ToolDetail } from "../_types";

export const toolDetailMock: ToolDetail = {
	slug: "adobe-lightroom-classic",
	name: "Adobe Lightroom Classic",
	shortDescription: "사진 보정과 편집, 카탈로그 관리에 강점을 가진 대표적인 사진 편집 도구입니다.",
	description:
		"Adobe Lightroom Classic은 사진가와 크리에이터를 위한 데스크톱 중심 사진 편집 및 관리 도구입니다. 색보정, 프리셋 적용, 카탈로그 관리, 인물 보정, RAW 편집 등 다양한 기능을 제공합니다.",
	updatedAt: "2025/07/04",
	category: {
		main: "디자인",
		sub: "사진 편집",
	},
	priceLabel: "부분 무료",
	platforms: ["Web", "Windows", "Mac"],
	support: 0,
	heroImageUrl: "/images/tools/lightroom-cover.png",
	introImages: ["/images/tools/lightroom-intro-1.png", "/images/tools/lightroom-intro-2.png"],
	features: [
		{
			id: 1,
			title: "자연어 기반 툴 생성",
			description: "사용자의 입력을 해석하여, 이미지 작업을 돕는 편집 흐름을 제안합니다.",
		},
		{
			id: 2,
			title: "코드 자동화 및 디버깅",
			description: "반복되는 작업 흐름을 자동화하고 오류를 줄일 수 있습니다.",
		},
		{
			id: 3,
			title: "텍스트 요약 및 번역",
			description: "문서와 설명 텍스트를 빠르게 요약하고 필요한 언어로 변환할 수 있습니다.",
		},
		{
			id: 4,
			title: "정보 검색 및 제공",
			description: "작업에 필요한 자료를 빠르게 탐색하고 활용할 수 있도록 도와줍니다.",
		},
		{
			id: 5,
			title: "음성 인식 및 반응",
			description: "입력 방식의 폭을 넓혀 다양한 사용자 경험을 제공합니다.",
		},
		{
			id: 6,
			title: "이미지 생성 및 분석",
			description: "이미지 기반 아이디어 탐색이나 시각 자료 해석을 지원합니다.",
		},
	],
	recommendedVideos: [
		{
			id: 1,
			imageUrl: "/images/tools/lightroom-video-1.png",
		},
		{
			id: 2,
			imageUrl: "/images/tools/lightroom-video-2.png",
		},
	],
	pricingPlans: [
		{
			id: "free",
			name: "Free",
			priceText: "무료 플랜",
			features: ["무료로 서비스를 사용할 수 있습니다."],
		},
		{
			id: "plus",
			name: "월간 Plus",
			priceText: "월 32,500원",
			features: [
				"GPT-4, GPT-4o, DALL·E 등 고급 모델 지원",
				"더 높은 사용량 한도 제공",
				"파일 업로드 및 고급 작업 가능",
				"워크스페이스 생산성 기능 제공",
			],
			isRecommended: true,
		},
		{
			id: "team",
			name: "월간 Team",
			priceText: "월 32,500원",
			features: [
				"팀 협업 중심 기능 제공",
				"공유 및 운영 관리 기능 포함",
				"워크스페이스 단위 제어 가능",
			],
		},
	],
	useCases: [
		{
			id: 1,
			title: "피그마에서 반응형 웹 만들기 - 오픈레이아웃",
			summary: "실무 중심 워크플로우로 반응형 웹 화면을 빠르게 설계합니다.",
			author: "History",
			thumbnailUrl: "/images/tools/usecase-1.png",
		},
		{
			id: 2,
			title: "피그마에서 반응형 웹 만들기 - 오픈레이아웃",
			summary: "실무 중심 워크플로우로 반응형 웹 화면을 빠르게 설계합니다.",
			author: "History",
			thumbnailUrl: "/images/tools/usecase-2.png",
		},
		{
			id: 3,
			title: "피그마에서 반응형 웹 만들기 - 오픈레이아웃",
			summary: "실무 중심 워크플로우로 반응형 웹 화면을 빠르게 설계합니다.",
			author: "History",
			thumbnailUrl: "/images/tools/usecase-3.png",
		},
	],
	relatedPosts: [
		{
			id: 1,
			category: "Adobe Illustrator",
			author: "닉네임",
			date: "2025.01.01",
			title: "대학생들이 가장 많이 저장한 글이에요.",
			summary:
				"대학생들이 가장 많이 저장한 글이며, 실제 작업에 참고하기 좋은 내용을 담고 있습니다.",
			thumbnailUrl: "/images/tools/post-thumb-1.png",
			likeCount: 7,
			commentCount: 30,
		},
		{
			id: 2,
			category: "Adobe Illustrator",
			author: "닉네임",
			date: "2025.01.01",
			title: "대학생들이 가장 많이 저장한 글이에요.",
			summary:
				"대학생들이 가장 많이 저장한 글이며, 실제 작업에 참고하기 좋은 내용을 담고 있습니다.",
			thumbnailUrl: "/images/tools/post-thumb-2.png",
			likeCount: 7,
			commentCount: 30,
		},
		{
			id: 3,
			category: "Adobe Illustrator",
			author: "닉네임",
			date: "2025.01.01",
			title: "대학생들이 가장 많이 저장한 글이에요.",
			summary:
				"대학생들이 가장 많이 저장한 글이며, 실제 작업에 참고하기 좋은 내용을 담고 있습니다.",
			thumbnailUrl: "/images/tools/post-thumb-3.png",
			likeCount: 7,
			commentCount: 30,
		},
	],
	relatedTools: [
		{
			id: 1,
			name: "Adobe Lightroom Classic",
			category: "데이터",
			priceType: "무료",
			thumbnailUrl: "/images/tools/related-tool-1.png",
		},
		{
			id: 2,
			name: "Adobe Lightroom Classic",
			category: "데이터",
			priceType: "무료",
			thumbnailUrl: "/images/tools/related-tool-2.png",
		},
	],
};
