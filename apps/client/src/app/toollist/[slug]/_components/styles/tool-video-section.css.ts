import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	padding: "0 24px",
});

export const title = style({
	...themeVars.fonts.t3_1,
	color: colors.grayscale[900],
});

export const grid = style({
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
	gap: "16px",

	"@media": {
		"screen and (max-width: 768px)": {
			gridTemplateColumns: "1fr",
		},
	},
});

export const card = style({
	position: "relative",
	aspectRatio: "16 / 9",
	borderRadius: "18px",
	overflow: "hidden",
	background: "#f3f4f6",
});

export const image = style({
	objectFit: "cover",
});
