import { colorTokens, typographyTokens } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const bellWrapper = style({
	position: "relative",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
});

export const bellButton = style({
	position: "relative",
	background: "none",
	border: "none",
	cursor: "pointer",
	padding: "8px",
	borderRadius: "50%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	color: colorTokens.grayscale[700],
	transition: "background-color 0.2s ease",
	selectors: {
		"&:hover": {
			backgroundColor: colorTokens.grayscale[50],
		},
	},
});

export const badgeDot = style({
	position: "absolute",
	top: "6px",
	right: "6px",
	width: "8px",
	height: "8px",
	borderRadius: "50%",
	backgroundColor: colorTokens.brand.orange[500],
	border: `2px solid ${colorTokens.grayscale[0]}`,
});

export const badgeCount = style({
	position: "absolute",
	top: "2px",
	right: "2px",
	backgroundColor: colorTokens.brand.orange[500],
	color: colorTokens.grayscale[0],
	borderRadius: "10px",
	padding: "1px 5px",
	...typographyTokens.h6_2,
	lineHeight: "1",
	border: `2px solid ${colorTokens.grayscale[0]}`,
});
