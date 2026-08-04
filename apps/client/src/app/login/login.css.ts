import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const page = style({
	minHeight: "100vh",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: colors.grayscale["0"],
});

export const card = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "48px",
	padding: "64px 48px",
	width: "100%",
	maxWidth: "440px",
});

export const logoArea = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "12px",
	textAlign: "center",
});

export const logoTitle = style({
	...themeVars.fonts.h1_1,
	color: colors.brand.iris["500"],
});

export const logoSubtitle = style({
	...themeVars.fonts.b3_1,
	color: colors.grayscale["400"],
});

export const kakaoButton = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "8px",
	width: "100%",
	padding: "16px 24px",
	backgroundColor: "#FEE500",
	color: "rgba(0, 0, 0, 0.85)",
	border: "none",
	borderRadius: "12px",
	...themeVars.fonts.t3_1,
	cursor: "pointer",
	transition: "opacity 0.15s",

	":hover": {
		opacity: 0.9,
	},

	":disabled": {
		opacity: 0.6,
		cursor: "not-allowed",
	},
});

export const errorMessage = style({
	...themeVars.fonts.b5_1,
	color: colors.system.red.lt,
	textAlign: "center",
});
