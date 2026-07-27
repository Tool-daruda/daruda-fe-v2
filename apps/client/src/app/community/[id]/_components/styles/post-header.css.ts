import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const wrapper = style({
	display: "flex",
	flexDirection: "column",
	gap: "16px",
	width: "100%",
});

export const toolBadge = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
	width: "fit-content",
	padding: "6px 8px 6px 6px",
	borderRadius: "12px",
	backgroundColor: colors.grayscale[25],
});

export const toolLogo = style({
	position: "relative",
	flexShrink: 0,
	width: "24px",
	height: "24px",
	borderRadius: "4px",
	backgroundColor: colors.grayscale[100],
	overflow: "hidden",
});

export const toolName = style({
	...themeVars.fonts.t3_1,
	color: colors.brand.iris[500],
});

export const divider = style({
	width: "100%",
	height: "1px",
	backgroundColor: colors.grayscale[50],
});

export const titleRow = style({
	display: "flex",
	alignItems: "flex-start",
	justifyContent: "space-between",
	width: "100%",
	gap: "12px",
});

export const titleBlock = style({
	display: "flex",
	flexDirection: "column",
	gap: "12px",
	flex: 1,
	minWidth: 0,
});

export const title = style({
	margin: 0,
	...themeVars.fonts.h3_1,
	color: colors.grayscale[900],
	wordBreak: "break-word",
});

export const metaRow = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
});

export const author = style({
	...themeVars.fonts.b4_2,
	color: colors.grayscale[700],
});

export const metaDivider = style({
	width: "1px",
	height: "16px",
	backgroundColor: colors.grayscale[200],
});

export const date = style({
	...themeVars.fonts.caption1_1,
	color: colors.grayscale[700],
});

export const etcButton = style({
	flexShrink: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "28px",
	height: "28px",
	background: "none",
	border: "none",
	padding: 0,
	cursor: "pointer",
});

export const menuWrapper = style({
	position: "relative",
	flexShrink: 0,
});

export const dropdown = style({
	left: 0,
	top: "calc(100% + 6px)",
});
