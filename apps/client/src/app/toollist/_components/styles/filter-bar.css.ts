import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	marginBottom: "20px",
});

export const toggleWrapper = style({
	display: "flex",
	alignItems: "center",
	gap: "12px",
	cursor: "pointer",
});

export const toggleLabel = style({
	...themeVars.fonts.t4_1,
	color: colors.grayscale[700],
});

export const switchRoot = style({
	width: "50px",
	height: "26px",
	backgroundColor: colors.grayscale[100],
	borderRadius: "999px",
	position: "relative",
	transition: "background-color 0.2s ease",
	selectors: {
		"&[data-state='checked']": {
			backgroundColor: colors.brand.iris[500],
		},
	},
});

export const switchThumb = style({
	width: "20px",
	height: "20px",
	backgroundColor: colors.grayscale[0],
	borderRadius: "50%",
	position: "absolute",
	top: "3px",
	left: "3px",
	transition: "transform 0.2s ease",
	selectors: {
		"[data-state='checked'] &": {
			transform: "translateX(24px)",
		},
	},
});

export const sortWrapper = style({
	display: "flex",
	alignItems: "center",
	gap: "8px",
});

export const sortItem = style({
	cursor: "pointer",
	...themeVars.fonts.b4_1,
	color: colors.grayscale[300],
	selectors: {
		"&.active": {
			color: colors.grayscale[700],
		},
	},
});

export const divider = style({
	width: "1px",
	height: "12px",
	backgroundColor: colors.grayscale[200],
	borderRadius: "999px",
});
