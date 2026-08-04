import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const section = style({
	display: "flex",
	flexDirection: "column",
	gap: "24px",
	width: "100%",
});

export const headRow = style({
	display: "flex",
	alignItems: "flex-end",
	gap: "12px",
	flexWrap: "wrap",
});

export const titleRow = style({
	display: "flex",
	alignItems: "center",
	gap: "4px",
});

export const title = style({
	...themeVars.fonts.h4_1,
	color: colors.grayscale[900],
});

export const hashtagList = style({
	display: "flex",
	alignItems: "center",
	gap: "8px",
	...themeVars.fonts.t5_1,
	color: colors.brand.iris[300],
});

export const cardGrid = style({
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	gap: "13px",
	width: "100%",
});

export const divider = style({
	width: "100%",
	height: "1px",
	backgroundColor: colors.grayscale[50],
});

export const card = style({
	display: "flex",
	flexDirection: "column",
	backgroundColor: colors.grayscale[0],
	border: `1px solid ${colors.grayscale[25]}`,
	borderRadius: "12px",
	overflow: "hidden",
	paddingBottom: "14px",
	textDecoration: "none",
});

export const thumbnailWrapper = style({
	position: "relative",
	width: "100%",
	height: "165px",
	backgroundColor: colors.grayscale[50],
	marginBottom: "14px",
});

export const badge = style({
	position: "absolute",
	top: "18px",
	left: "18px",
	width: "28px",
	height: "28px",
	borderRadius: "6px",
	overflow: "hidden",
});

export const cardBody = style({
	display: "flex",
	flexDirection: "column",
	gap: "6px",
	padding: "0 16px",
});

export const cardTitle = style({
	...themeVars.fonts.t4_1,
	color: colors.grayscale[900],
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

export const metaRow = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
	...themeVars.fonts.caption2_2,
	color: colors.grayscale[300],
});

export const metaDivider = style({
	width: "1px",
	height: "10px",
	backgroundColor: colors.grayscale[200],
});
