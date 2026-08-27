import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	padding: "40px 32px",
});

export const title = style({
	...themeVars.fonts.t4_1,
	color: colors.grayscale[900],
	marginBottom: "6px",
});

export const description = style({
	...themeVars.fonts.caption2_1,
	color: colors.grayscale[300],
	marginBottom: "24px",
});
