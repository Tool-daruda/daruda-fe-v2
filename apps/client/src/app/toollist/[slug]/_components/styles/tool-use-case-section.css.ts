import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	padding: "0 24px",
});

export const header = style({
	marginBottom: "20px",
});

export const title = style({
	...themeVars.fonts.t3_1,
	color: colors.grayscale[900],
});

export const grid = style({
	display: "grid",
	gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
	gap: "16px",

	"@media": {
		"screen and (max-width: 1024px)": {
			gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
		},
		"screen and (max-width: 768px)": {
			gridTemplateColumns: "1fr",
		},
	},
});

export const card = style({
	display: "block",
	borderRadius: "12px",
	border: `1px solid ${colors.grayscale[25]}`,
	background: colors.grayscale[0],
	overflow: "hidden",
	color: "inherit",
	textDecoration: "none",
});

export const thumbnail = style({
	position: "relative",
	aspectRatio: "16 / 10",
	background: "#f3f4f6",
});

export const thumbnailImage = style({
	objectFit: "cover",
});

export const content = style({
	padding: "16px",
});

export const cardTitle = style({
	...themeVars.fonts.t4_1,
	color: colors.grayscale[900],
});

export const summary = style({
	...themeVars.fonts.caption2_1,
	color: colors.grayscale[300],
});

export const author = style({
	marginTop: "10px",
	fontSize: "13px",
	color: "#ef4444",
});
