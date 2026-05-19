import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const sidebarContainer = style({
	width: "236px",
	height: "fit-content",
	flexShrink: 0,
	backgroundColor: "#fff",
	borderRadius: "24px",
	padding: "32px 24px",
	border: `1px solid ${colors.grayscale[25]}`,
	display: "flex",
	flexDirection: "column",
	gap: "24px",
});

export const title = style({
	color: colors.grayscale[900],
	...themeVars.fonts.h4_1,
	margin: 0,
});

export const list = style({
	display: "flex",
	flexDirection: "column",
	gap: "8px",
});

export const categoryItem = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "12px 8px",
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
	border: `2px solid ${colors.grayscale[200]}`,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	transition: "all 0.2s ease",
	selectors: {
		[`${categoryItem}.active &`]: {
			borderColor: colors.brand.iris[500],
		},
	},
});

export const radioInner = style({
	width: "10px",
	height: "10px",
	borderRadius: "50%",
	backgroundColor: colors.brand.iris[500],
	display: "none",
	selectors: {
		[`${categoryItem}.active &`]: {
			display: "block",
		},
	},
});
