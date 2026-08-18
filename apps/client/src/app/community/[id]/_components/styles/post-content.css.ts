import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const wrapper = style({
	display: "flex",
	flexDirection: "column",
	gap: "20px",
	width: "100%",
});

export const bodyText = style({
	margin: 0,
	width: "100%",
	whiteSpace: "pre-wrap",
	wordBreak: "break-word",
	...themeVars.fonts.caption1_1,
	color: colors.grayscale[900],
});

export const imageButton = style({
	display: "block",
	width: "100%",
	height: "432px",
	padding: 0,
	border: "none",
	borderRadius: "8px",
	backgroundColor: colors.grayscale[50],
	cursor: "pointer",
	overflow: "hidden",
});

export const image = style({
	objectFit: "cover",
});
