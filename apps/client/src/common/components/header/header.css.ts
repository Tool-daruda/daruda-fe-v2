import { media, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";
import { pageContainer } from "@/common/styles/layout.css";

/** 드로어 패널의 top 위치를 헤더 높이와 맞추기 위해 공유한다. */
export const HEADER_HEIGHT = { mobile: "6.4rem", desktop: "7.2rem" } as const;

export const header = style({
	width: "100%",
	height: HEADER_HEIGHT.desktop,
	borderBottom: `0.1rem solid ${themeVars.colors.grayscale[25]}`,
	backgroundColor: themeVars.colors.grayscale[0],
	display: "flex",
	justifyContent: "center",
	// 드로어 딤(zIndex 10)보다 위에 있어야 헤더가 딤에 덮이지 않는다.
	position: "relative",
	zIndex: 20,

	"@media": {
		[media.belowMd]: {
			height: HEADER_HEIGHT.mobile,
		},
	},
});

export const inner = style([
	pageContainer,
	{
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
]);

export const leftSection = style({
	display: "flex",
	alignItems: "center",
	gap: "2.6rem",

	"@media": {
		[media.belowMd]: {
			gap: "0.4rem",
		},
	},
});

export const logo = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "0.4rem 1.2rem",
	textDecoration: "none",
	fontSize: "2rem",
	fontWeight: 700,
	lineHeight: 1,
});

export const nav = style({
	display: "flex",
	alignItems: "center",
	gap: "2rem",

	"@media": {
		[media.belowMd]: {
			display: "none",
		},
	},
});

export const navLink = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "0.4rem 1.2rem",
	textDecoration: "none",
	...themeVars.fonts.b4_2,
	color: themeVars.colors.grayscale[300],
	whiteSpace: "nowrap",
	transition: "color 0.2s ease",
	selectors: {
		"&:hover": {
			color: themeVars.colors.grayscale[500],
		},
	},
});

export const navLinkActive = style({
	...themeVars.fonts.b4_2,
	color: themeVars.colors.grayscale[700],
});

export const authSection = style({
	display: "flex",
	alignItems: "center",
	gap: "2rem",

	"@media": {
		[media.belowMd]: {
			gap: "0.4rem",
		},
	},
});

export const iconButton = style({
	width: "2.8rem",
	height: "2.8rem",
	border: "none",
	background: "transparent",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	padding: 0,
	transition: "opacity 0.15s",
	selectors: {
		"&:hover": {
			opacity: 0.7,
		},
	},

	"@media": {
		[media.belowMd]: {
			// 아이콘 자체 크기는 그대로 두고 탭 타깃만 44px로 넓힌다.
			width: "4.4rem",
			height: "4.4rem",
		},
	},
});

/** 모바일에서만 보이는 요소(햄버거, 헤더 검색 아이콘 등)에 쓴다. */
export const mobileOnly = style({
	display: "none",

	"@media": {
		[media.belowMd]: {
			display: "inline-flex",
		},
	},
});

/** 데스크톱에서만 보이는 요소(로그인/마이페이지 링크 등)에 쓴다. */
export const desktopOnly = style({
	"@media": {
		[media.belowMd]: {
			display: "none",
		},
	},
});
