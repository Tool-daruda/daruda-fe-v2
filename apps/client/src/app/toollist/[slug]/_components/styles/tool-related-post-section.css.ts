import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	padding: "0 24px",
});

export const header = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	marginBottom: "20px",
});

export const title = style({
	...themeVars.fonts.t3_1,
	color: colors.grayscale[900],
});

export const moreButton = style({
	border: "none",
	background: "transparent",
	...themeVars.fonts.b4_1,
	color: colors.grayscale[300],
	cursor: "pointer",
});

export const list = style({
	display: "flex",
	flexDirection: "column",
	gap: "16px",
});

export const card = style({
	padding: "20px",
	borderRadius: "18px",
	border: "1px solid #ececec",
	background: "#ffffff",
});

export const meta = style({
	display: "flex",
	gap: "10px",
	flexWrap: "wrap",
	fontSize: "12px",
	color: "#9ca3af",
	marginBottom: "12px",
});

export const body = style({
	display: "grid",
	gridTemplateColumns: "minmax(0, 1fr) 96px",
	gap: "16px",
	alignItems: "center",

	"@media": {
		"screen and (max-width: 600px)": {
			gridTemplateColumns: "1fr",
		},
	},
});

export const textBlock = style({
	minWidth: 0,
});

export const cardTitle = style({
	fontSize: "18px",
	fontWeight: 700,
	color: "#111827",
	lineHeight: 1.5,
});

export const summary = style({
	marginTop: "8px",
	fontSize: "14px",
	color: "#6b7280",
	lineHeight: 1.6,
});

export const reactionRow = style({
	display: "flex",
	gap: "12px",
	marginTop: "12px",
	fontSize: "13px",
	color: "#9ca3af",
});

export const thumbnail = style({
	position: "relative",
	width: "96px",
	height: "96px",
	borderRadius: "14px",
	overflow: "hidden",
	background: "#f3f4f6",

	"@media": {
		"screen and (max-width: 600px)": {
			width: "100%",
			height: "180px",
		},
	},
});

export const thumbnailImage = style({
	objectFit: "cover",
});
