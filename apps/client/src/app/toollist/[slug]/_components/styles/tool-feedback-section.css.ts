import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	padding: "40px 32px",
});

export const title = style({
	...themeVars.fonts.t4_1,
	color: colors.grayscale[900],
});

export const description = style({
	...themeVars.fonts.caption2_1,
	color: colors.grayscale[300],
});

export const button = style({
	margin: "0 auto",
	padding: "14px 20px",
	borderRadius: "16px",
	border: "none",
	backgroundColor: colors.brand.iris[100],
	color: colors.brand.iris[500],
	fontWeight: 700,
	cursor: "pointer",
});
