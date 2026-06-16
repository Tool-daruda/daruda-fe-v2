import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	padding: "32px",
	display: "flex",
	flexDirection: "column",
	gap: "20px",
});

export const title = style({
	...themeVars.fonts.t3_1,
	color: colors.grayscale[900],
});

export const grid = style({
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
	gap: "10px",
});

export const card = style({
	padding: "13px 18px",
	borderRadius: "12px",
	background: colors.grayscale[25],
});

export const cardHeader = style({
	display: "flex",
	gap: "4px",
	marginBottom: "4px",
});

export const number = style({
	...themeVars.fonts.t4_1,
	color: colors.brand.iris[500],
	margin: 0,
});

export const cardTitle = style({
	...themeVars.fonts.t4_1,
	color: colors.grayscale[900],
	margin: 0,
});

export const cardDescription = style({
	...themeVars.fonts.caption2_1,
	color: colors.grayscale[500],
	margin: 0,
});
