import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	position: "relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "16px",
	padding: "48px 20px",
	overflow: "hidden",
	background: colors.brand.iris[50],
});

export const decorativeImage = style({
	position: "absolute",
	right: "80px",
	top: "0",
	pointerEvents: "none",
	"@media": {
		"screen and (max-width: 960px)": {
			display: "none",
		},
	},
});

export const textGroup = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	zIndex: 1,
});

export const subTitle = style({
	...themeVars.fonts.b1_1,
	color: colors.brand.iris[400],
});

export const title = style({
	...themeVars.fonts.h2_1,
	color: colors.brand.iris[500],
});

export const inputWrapper = style({
	position: "relative",
	width: "100%",
	maxWidth: "440px",
	zIndex: 1,
});

export const input = style({
	width: "100%",
	padding: "12px 52px 12px 24px",
	borderRadius: "60px",
	boxSizing: "border-box",
	border: `1px solid ${colors.brand.iris[200]}`,
	...themeVars.fonts.b4_2,
	backgroundColor: colors.grayscale[0],
	outline: "none",
	transition: "border-color 0.2s ease",

	"::placeholder": {
		color: colors.grayscale[300],
	},
});

export const searchButton = style({
	position: "absolute",
	right: "20px",
	top: "50%",
	transform: "translateY(-50%)",
	background: "none",
	border: "none",
	padding: 0,
	cursor: "pointer",
	display: "flex",
});
