import { themeVars } from "@repo/ui";
import { style } from "@vanilla-extract/css";

export const container = style({
	width: "100%",
});

export const title = style({
	color: themeVars.colors.grayscale[800],
	...themeVars.fonts.t2_1,
	marginBottom: "2.8rem",
});

export const content = style({
	display: "flex",
	flexDirection: "column",
	gap: "2.4rem",
});

export const fieldStyle = style({
	width: "100%",
	display: "flex",
	alignItems: "start",
	gap: "2.8rem",
});

export const label = style({
	width: "9.5rem",
	textAlign: "right",
	color: themeVars.colors.grayscale[800],
	...themeVars.fonts.t4_1,
	whiteSpace: "pre",
});
