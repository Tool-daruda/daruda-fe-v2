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

export const relatedList = style({
	display: "flex",
	flexDirection: "column",
	gap: "16px",
	padding: 0,
	margin: 0,
	listStyle: "none",
});

export const relatedItem = style({
	display: "flex",
	gap: "20px",
	padding: "24px",
	borderRadius: "24px",
	background: "#fcfcfc",
	border: "1px solid #f1f1f1",
	alignItems: "center",
});

export const relatedThumb = style({
	position: "relative",
	width: "132px",
	height: "132px",
	borderRadius: "20px",
	overflow: "hidden",
	background: "#f3f3f3",
	flexShrink: 0,
});

export const relatedInfo = style({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	minWidth: 0,
	flex: 1,
});

export const relatedName = style({
	fontSize: "28px",
	lineHeight: "42px",
	fontWeight: 700,
	color: "#444444",
	wordBreak: "keep-all",
	margin: 0,
});

export const badges = style({
	display: "flex",
	flexWrap: "wrap",
	gap: "12px",
	marginTop: "20px",
});

export const badge = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	height: "44px",
	padding: "0 16px",
	borderRadius: "12px",
	background: "#f5f5f5",
	fontSize: "16px",
	lineHeight: "24px",
	fontWeight: 500,
	color: "#9a9a9a",
	wordBreak: "keep-all",
});

export const freeBadge = style({
	background: "#fff1df",
	color: "#ff7a00",
	fontWeight: 700,
});

export const activeTocItem = style({
	...themeVars.fonts.t5_2,
	color: colors.grayscale[700],
});

export const inactiveTocItem = style({
	...themeVars.fonts.b5_2,
	color: colors.grayscale[200],
});

export const relatedThumbImage = style({
	objectFit: "cover",
});
