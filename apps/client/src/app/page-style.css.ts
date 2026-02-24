import { themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const title = style({
	...themeVars.fonts.t2_1,
	color: themeVars.colors.brand.iris[500],
	marginBottom: "2.4rem",
});
