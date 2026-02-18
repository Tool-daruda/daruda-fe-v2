import { style } from "@vanilla-extract/css";
import { themeVars } from "src/foundations";

export const textAreaBaseStyle = style({
	display: "inline-flex",
	alignItems: "center",
	gap: "12px",
	border: "1px solid",
	color: themeVars.colors.grayscale[500],
	backgroundColor: themeVars.colors.grayscale[0],
	width: "424px",
	borderRadius: "14px",
	padding: "12px 12px 12px 20px",
	...themeVars.fonts.caption1_1,
	boxSizing: "border-box",

	selectors: {
		"&::placeholder": {
			color: themeVars.colors.grayscale[500],
			...themeVars.fonts.caption1_1,
		},
	},
});

export const textAreaSizeStyle = style({
	width: "424px",
	height: "124px",
});

export const textAreaActiveStyles = {
	active: style({
		borderColor: themeVars.colors.grayscale[400],
	}),
	inactive: style({
		borderColor: themeVars.colors.grayscale[50],
	}),
} as const;

export const textAreaDisabledStyle = style({
	cursor: "not-allowed",
});

export const textAreaErrorStyle = style({
	borderColor: themeVars.colors.system.red.lt,
});

export const inputStyle = style({
	width: "100%",
	height: "100%",
	resize: "none",
	border: "none",
	outline: "none",
	padding: 0,
	backgroundColor: "transparent",
	color: "inherit",
	font: "inherit",
	"::placeholder": {
		color: "inherit",
		font: "inherit",
	},
});
