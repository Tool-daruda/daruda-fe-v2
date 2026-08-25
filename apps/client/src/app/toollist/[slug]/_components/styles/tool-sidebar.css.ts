import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	display: "flex",
	flexDirection: "column",
	gap: "24px",
	width: "100%",
	background: colors.grayscale[0],
	borderRadius: "16px",
});

export const card = style({
	padding: "28px 24px",
});

export const cardTitle = style({
	...themeVars.fonts.t4_1,
	color: colors.grayscale[900],
	marginBottom: "14px",
	wordBreak: "keep-all",
});

export const tocList = style({
	display: "flex",
	flexDirection: "column",
	gap: "10px",
	padding: 0,
	margin: 0,
	listStyle: "none",
});

export const tocItem = style({
	...themeVars.fonts.t5_2,
	color: colors.grayscale[900],
	cursor: "pointer",
	wordBreak: "keep-all",
});

export const tocButton = style({
	display: "block",
	width: "100%",
	padding: 0,
	border: "none",
	background: "none",
	textAlign: "left",
	cursor: "pointer",
	wordBreak: "keep-all",
	transition: "color 0.2s ease",
});

export const relatedList = style({
	display: "flex",
	flexDirection: "column",
	gap: "10px",
	padding: 0,
	margin: 0,
	listStyle: "none",
});

export const activeTocItem = style({
	...themeVars.fonts.t5_2,
	color: colors.grayscale[700],
});

export const inactiveTocItem = style({
	...themeVars.fonts.b5_2,
	color: colors.grayscale[200],
});
