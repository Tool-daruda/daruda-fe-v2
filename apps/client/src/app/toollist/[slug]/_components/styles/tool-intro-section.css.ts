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
	display: "flex",
	gap: "14px",
	overflowX: "auto",
	scrollSnapType: "x mandatory",
});

export const imageCard = style({
	position: "relative",
	flex: "0 0 calc(50% - 7px)",
	aspectRatio: "43/24",
	borderRadius: "12px",
	overflow: "hidden",
	background: "#f3f4f6",
	scrollSnapAlign: "start",
	padding: 0,
	border: "none",
	cursor: "pointer",

	"@media": {
		"screen and (max-width: 768px)": {
			flex: "0 0 85%",
		},
	},
});

export const image = style({
	objectFit: "cover",
});
