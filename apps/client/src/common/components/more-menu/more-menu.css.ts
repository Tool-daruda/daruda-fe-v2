import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const menu = style({
	position: "absolute",
	zIndex: 100,
	display: "flex",
	flexDirection: "column",
	backgroundColor: colors.grayscale[0],
	border: `1px solid ${colors.grayscale[100]}`,
	borderRadius: "12px",
	overflow: "hidden",
	boxShadow: "0px 0px 12px 0px rgba(41, 41, 41, 0.20)",
	minWidth: "133px",
});

export const item = style({
	display: "flex",
	alignItems: "center",
	gap: "8px",
	width: "100%",
	padding: "16px 30px 16px 26px",
	background: "none",
	border: "none",
	borderBottom: `1px solid ${colors.grayscale[50]}`,
	cursor: "pointer",
	textAlign: "left",
	boxSizing: "border-box",

	selectors: {
		"&:last-child": {
			borderBottom: "none",
		},
		"&:hover": {
			backgroundColor: colors.grayscale[25],
		},
	},
});

export const icon = style({
	flexShrink: 0,
});

export const label = style({
	...themeVars.fonts.caption1_1,
	color: colors.grayscale[900],
	whiteSpace: "nowrap",
});
