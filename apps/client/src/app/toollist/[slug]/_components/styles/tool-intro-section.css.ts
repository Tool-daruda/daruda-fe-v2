import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	padding: "0 24px",
});

export const title = style({
	...themeVars.fonts.t2_1,
	color: colors.grayscale[900],
});

export const description = style({
	marginTop: "12px",
	...themeVars.fonts.caption2_1,
	color: colors.grayscale[700],
});

export const imageGrid = style({
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
	gap: "14px",

	"@media": {
		"screen and (max-width: 768px)": {
			gridTemplateColumns: "1fr",
		},
	},
});

export const imageCard = style({
	position: "relative",
	aspectRatio: "43/24",
	borderRadius: "12px",
	overflow: "hidden",
	background: "#f3f4f6",
});

export const image = style({
	objectFit: "cover",
});
