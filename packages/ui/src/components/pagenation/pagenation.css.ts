import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "src/foundations";

export const paginationContainer = style({
	display: "flex",
	alignItems: "center",
	gap: "8px",
});

export const pageButton = style({
	...themeVars.fonts.t3_1,
	display: "flex",
	width: "36px",
	height: "36px",
	padding: "8px 0",
	justifyContent: "center",
	alignItems: "center",
	aspectRatio: "1/1",
	borderRadius: "80px",
	background: themeVars.colors.grayscale[5],
	color: themeVars.colors.grayscale[800],
	border: "none",
	cursor: "pointer",
	userSelect: "none",

	":hover": {
		background: themeVars.colors.grayscale[50],
		color: themeVars.colors.grayscale[800],
	},

	":disabled": {
		cursor: "not-allowed",
	},
});

export const active = style({
	background: themeVars.colors.grayscale[600],
	color: themeVars.colors.grayscale[0],
});

export const arrowIconClass = style({});

globalStyle(`${arrowIconClass}:hover path`, {
	stroke: themeVars.colors.grayscale[200],
});
