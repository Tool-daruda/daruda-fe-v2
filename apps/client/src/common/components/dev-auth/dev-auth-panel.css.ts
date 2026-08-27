import { themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const toggleButton = style({
	position: "fixed",
	right: "3.2rem",
	bottom: "3.2rem",
	zIndex: 9998,
	display: "inline-flex",
	alignItems: "center",
	gap: "0.6rem",
	padding: "1rem 1.6rem",
	borderRadius: "999rem",
	border: "none",
	cursor: "pointer",
	...themeVars.fonts.caption1_1,
	color: themeVars.colors.grayscale[0],
	backgroundColor: themeVars.colors.grayscale[950],
	boxShadow: "0 0.4rem 1.2rem rgba(0, 0, 0, 0.24)",
});

export const panel = style({
	position: "fixed",
	right: "3.2rem",
	bottom: "3.2rem",
	zIndex: 9998,
	display: "flex",
	flexDirection: "column",
	gap: "1.2rem",
	width: "40rem",
	maxWidth: "calc(100vw - 6.4rem)",
	padding: "2rem",
	borderRadius: "1.2rem",
	border: `0.1rem solid ${themeVars.colors.grayscale[100]}`,
	backgroundColor: themeVars.colors.grayscale[0],
	boxShadow: "0 0.8rem 2.4rem rgba(0, 0, 0, 0.16)",
});

export const header = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: "1.2rem",
});

export const title = style({
	...themeVars.fonts.t5_1,
	color: themeVars.colors.grayscale[950],
});

export const closeButton = style({
	padding: "0.4rem",
	border: "none",
	background: "none",
	cursor: "pointer",
	...themeVars.fonts.caption1_1,
	color: themeVars.colors.grayscale[400],
});

export const status = style({
	...themeVars.fonts.caption2_2,
	color: themeVars.colors.grayscale[500],
});

export const statusValue = style({
	...themeVars.fonts.caption2_1,
});

export const loggedIn = style({
	color: themeVars.colors.system.green.lt,
});

export const loggedOut = style({
	color: themeVars.colors.system.red.lt,
});

export const field = style({
	display: "flex",
	flexDirection: "column",
	gap: "0.6rem",
});

export const label = style({
	...themeVars.fonts.caption2_1,
	color: themeVars.colors.grayscale[700],
});

export const textarea = style({
	width: "100%",
	minHeight: "7.2rem",
	padding: "0.8rem 1rem",
	borderRadius: "0.6rem",
	border: `0.1rem solid ${themeVars.colors.grayscale[100]}`,
	backgroundColor: themeVars.colors.grayscale[25],
	color: themeVars.colors.grayscale[950],
	fontFamily: "monospace",
	fontSize: "1.1rem",
	lineHeight: "1.6rem",
	resize: "vertical",
	wordBreak: "break-all",
	boxSizing: "border-box",
});

export const actions = style({
	display: "flex",
	gap: "0.8rem",
});

const actionBase = style({
	flex: 1,
	padding: "1rem",
	borderRadius: "0.6rem",
	cursor: "pointer",
	...themeVars.fonts.caption1_1,
	selectors: {
		"&:disabled": {
			opacity: 0.5,
			cursor: "not-allowed",
		},
	},
});

export const applyButton = style([
	actionBase,
	{
		border: "none",
		color: themeVars.colors.grayscale[0],
		backgroundColor: themeVars.colors.grayscale[950],
	},
]);

export const clearButton = style([
	actionBase,
	{
		border: `0.1rem solid ${themeVars.colors.grayscale[100]}`,
		color: themeVars.colors.grayscale[700],
		backgroundColor: themeVars.colors.grayscale[0],
	},
]);

export const message = style({
	...themeVars.fonts.caption2_2,
	color: themeVars.colors.system.red.lt,
	wordBreak: "keep-all",
});

export const hint = style({
	...themeVars.fonts.caption2_2,
	color: themeVars.colors.grayscale[400],
	wordBreak: "keep-all",
});
