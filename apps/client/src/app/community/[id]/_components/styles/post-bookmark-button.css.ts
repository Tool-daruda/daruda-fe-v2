import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const button = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
	padding: "8px 24px 8px 20px",
	borderRadius: "200px",
	border: "none",
	backgroundColor: colors.brand.iris[50],
	cursor: "pointer",
});

export const count = style({
	...themeVars.fonts.b2_1,
	color: colors.brand.iris[500],
});
