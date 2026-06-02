import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	paddingTop: "60px",
});

export const title = style({
	color: colors.grayscale[900],
	...themeVars.fonts.t1_1,
	marginBottom: "50px",
});

export const warningList = style({
	listStyleType: "disc",
	paddingLeft: "20px",
	color: themeVars.colors.grayscale[600],
	...themeVars.fonts.b4_1,
	marginBottom: "90px",
	wordBreak: "keep-all",
});
