import { themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const bellWrapper = style({
	position: "relative",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
});

export const bellButton = style({
	position: "relative",
	width: "2.8rem",
	height: "2.8rem",
	border: "none",
	background: "transparent",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	padding: 0,
	transition: "opacity 0.15s",
	selectors: {
		"&:hover": {
			opacity: 0.7,
		},
	},
});

export const badgeDot = style({
	position: "absolute",
	top: "0.5rem",
	right: "0.6rem",
	width: "0.6rem",
	height: "0.6rem",
	borderRadius: "50%",
	backgroundColor: themeVars.colors.brand.orange[500],
});
