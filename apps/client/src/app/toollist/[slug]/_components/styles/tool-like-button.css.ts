import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const button = style({
	margin: "0 auto",
	padding: "14px 20px",
	borderRadius: "16px",
	border: "none",
	backgroundColor: colors.brand.iris[100],
	color: colors.brand.iris[500],
	fontWeight: 700,
	cursor: "pointer",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	gap: "6px",
	transition: "background-color 0.2s, color 0.2s",
});

export const buttonLiked = style({
	backgroundColor: colors.brand.iris[500],
	color: colors.grayscale[0],
});

export const buttonContent = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	...themeVars.fonts.t4_1,
	gap: "4px",
});

export const count = style({
	...themeVars.fonts.b5_2,
});
