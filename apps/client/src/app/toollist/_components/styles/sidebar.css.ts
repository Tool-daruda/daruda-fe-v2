import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const sidebarContainer = style({
	width: "236px",
	height: "fit-content",
	flexShrink: 0,
	backgroundColor: colors.grayscale[0],
	borderRadius: "24px",
	padding: "20px 24px",
	border: `1px solid ${colors.grayscale[25]}`,
	display: "flex",
	flexDirection: "column",
	gap: "12px",
});

export const title = style({
	color: colors.grayscale[900],
	...themeVars.fonts.h4_1,
	margin: 0,
});

export const list = style({
	display: "flex",
	flexDirection: "column",
	gap: "12px",
});

export const categoryItem = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	cursor: "pointer",

	color: colors.grayscale[500],
	...themeVars.fonts.b4_2,
	transition: "all 0.2s ease",
	selectors: {
		"&.active": {
			color: colors.brand.iris[500],
			fontWeight: "700",
		},
	},
});

export const radioCircle = style({
	width: "20px",
	height: "20px",
	borderRadius: "50%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	flexShrink: 0,
});

export const radioRing = style({
	width: "13px",
	height: "13px",
	borderRadius: "50%",
	backgroundColor: colors.grayscale[0],
	border: `1px solid ${colors.brand.iris[100]}`,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	transition: "all 0.2s ease",
	selectors: {
		[`${categoryItem}.active &`]: {
			width: "14px",
			height: "14px",
			border: "none",
			backgroundColor: colors.brand.iris[500],
		},
	},
});

export const radioInner = style({
	width: "6px",
	height: "6px",
	borderRadius: "50%",
	backgroundColor: colors.grayscale[0],
	display: "none",
	selectors: {
		[`${categoryItem}.active &`]: {
			display: "block",
		},
	},
});
