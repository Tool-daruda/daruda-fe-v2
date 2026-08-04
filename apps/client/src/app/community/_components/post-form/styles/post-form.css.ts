import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";
import { b3_2Font } from "./typography";

export const container = style({
	maxWidth: "742px",
	margin: "0 auto",
	padding: "40px 20px 100px",
	display: "flex",
	flexDirection: "column",
	gap: "32px",
});

export const heading = style({
	margin: 0,
	...themeVars.fonts.h1_1,
	color: colors.grayscale[900],
});

export const fieldsSection = style({
	display: "flex",
	flexDirection: "column",
	gap: "16px",
	width: "100%",
});

export const titleInput = style({
	width: "100%",
	boxSizing: "border-box",
	padding: "12px 16px",
	borderRadius: "16px",
	border: `1px solid ${colors.grayscale[50]}`,
	outline: "none",
	...b3_2Font,
	color: colors.grayscale[900],

	"::placeholder": {
		color: colors.grayscale[200],
	},
});

export const bodyTextarea = style({
	width: "100%",
	height: "398px",
	boxSizing: "border-box",
	padding: "15px",
	borderRadius: "16px",
	border: `1px solid ${colors.grayscale[50]}`,
	outline: "none",
	resize: "none",
	...themeVars.fonts.b4_2,
	color: colors.grayscale[900],

	"::placeholder": {
		color: colors.grayscale[200],
	},
});

export const imageError = style({
	...themeVars.fonts.caption2_1,
	color: colors.system.red.lt,
});

export const footerRow = style({
	display: "flex",
	alignItems: "flex-start",
	justifyContent: "space-between",
	gap: "16px",
	width: "100%",
});

export const helperList = style({
	margin: 0,
	paddingLeft: "18px",
	display: "flex",
	flexDirection: "column",
	gap: "2px",
	...themeVars.fonts.caption2_1,
	color: colors.grayscale[200],
});

export const submitArea = style({
	flexShrink: 0,
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-end",
	gap: "8px",
});

export const submitError = style({
	...themeVars.fonts.caption2_1,
	color: colors.system.red.lt,
});

export const submitButton = style({
	flexShrink: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "131px",
	height: "54px",
	padding: "15px 50px",
	borderRadius: "12px",
	border: "none",
	boxSizing: "border-box",
	...themeVars.fonts.t2_1,
	cursor: "pointer",
	backgroundColor: colors.grayscale[100],
	color: colors.grayscale[300],

	selectors: {
		"&[data-active='true']": {
			backgroundColor: colors.brand.iris[500],
			color: colors.grayscale[0],
		},
	},
});
