import { themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	padding: "2rem",
	textAlign: "center",
	background: themeVars.colors.brand.iris["50"],
});

export const title = style({
	color: themeVars.colors.brand.orange["500"],
});

export const description = style({
	...themeVars.fonts.h1_1,
});
