import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "48px 24px",
	borderRadius: "12px",
	background: colors.grayscale[25],
});

export const message = style({
	...themeVars.fonts.b5_2,
	color: colors.grayscale[500],
	textAlign: "center",
	wordBreak: "keep-all",
	margin: 0,
});
