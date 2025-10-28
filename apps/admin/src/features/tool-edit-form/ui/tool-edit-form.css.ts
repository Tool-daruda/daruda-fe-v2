import { themeVars } from "@repo/ui";
import { style } from "@vanilla-extract/css";

export const sectionStyle = style({
	width: "100%",
	display: "flex",
	flexDirection: "column",
	gap: "6rem",
	marginTop: "3rem",
	marginBottom: "5.6rem",
});

export const buttonGroupStyle = style({
	width: "100%",
	display: "flex",
	justifyContent: "center",
	gap: "1.6rem",
});

export const sectionPStyle = style({
	...themeVars.fonts.t4_1,
	color: themeVars.colors.grayscale[400],
});

export const sectionGroupStyle = style({
	display: "flex",
	flexDirection: "column",
	gap: "2.4rem",
	marginBottom: "0.4rem",
});

export const sectionTitleGroupStyle = style({
	display: "flex",
	alignItems: "center",
	gap: "3.2rem",
});

export const hrStyle = style({
	width: "75.6rem",
	height: "0.2rem",
	background: themeVars.colors.grayscale[50],
});
