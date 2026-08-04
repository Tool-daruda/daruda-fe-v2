import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	position: "relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	marginBottom: "20px",
	paddingTop: "40px",
	paddingBottom: "50px",
	textAlign: "center",
	background: colors.brand.iris[50],
});

export const decorativeImage = style({
	position: "absolute",
	right: "194px",
	bottom: "0",
});

export const subTitle = style({
	...themeVars.fonts.b1_1,
	color: colors.brand.iris[400],
	zIndex: 1,
});

export const title = style({
	...themeVars.fonts.h2_1,
	color: colors.brand.iris[500],
	marginBottom: "24px",
	zIndex: 1,
});

export const inputWrapper = style({
	position: "relative",
	width: "100%",
	maxWidth: "600px",
});

export const input = style({
	width: "100%",
	padding: "16px 24px",
	paddingRight: "50px",
	borderRadius: "30px",
	boxSizing: "border-box",
	border: `1px solid ${colors.brand.iris[200]}`,
	...themeVars.fonts.caption1_1,
	backgroundColor: colors.grayscale[0],
	outline: "none",
	transition: "border-color 0.2s ease",
});

export const searchIcon = style({
	position: "absolute",
	right: "24px",
	top: "50%",
	transform: "translateY(-50%)",
	color: colors.brand.iris[500],
	cursor: "pointer",
});
