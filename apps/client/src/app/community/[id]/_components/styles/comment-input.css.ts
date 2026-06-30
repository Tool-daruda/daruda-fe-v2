import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const wrapper = style({
	display: "flex",
	flexDirection: "column",
	gap: "10px",
	width: "100%",
	boxSizing: "border-box",
	padding: "16px 16px 12px",
	borderRadius: "12px",
	border: `1px solid ${colors.grayscale[50]}`,
	backgroundColor: colors.grayscale[25],
});

export const imagePreview = style({
	position: "relative",
	flexShrink: 0,
	width: "80px",
	height: "80px",
	borderRadius: "8px",
	backgroundColor: colors.grayscale[100],
});

export const imageRemoveButton = style({
	position: "absolute",
	top: "6px",
	right: "6px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "20px",
	height: "20px",
	background: "none",
	border: "none",
	padding: 0,
	cursor: "pointer",
});

export const fieldGroup = style({
	display: "flex",
	flexDirection: "column",
	gap: "18px",
	width: "100%",
});

export const textarea = style({
	width: "100%",
	resize: "none",
	border: "none",
	outline: "none",
	background: "transparent",
	...themeVars.fonts.b4_2,
	color: colors.grayscale[900],

	"::placeholder": {
		color: colors.grayscale[300],
	},
});

export const actionsRow = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: "12px",
	width: "100%",
});

export const actionsLeft = style({
	display: "flex",
	alignItems: "center",
	gap: "4px",
	minWidth: 0,
});

export const imageButton = style({
	flexShrink: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "24px",
	height: "24px",
	background: "none",
	border: "none",
	padding: 0,
	cursor: "pointer",
});

export const warningText = style({
	...themeVars.fonts.caption2_1,
	color: colors.system.red.lt,
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

export const submitButton = style({
	flexShrink: 0,
	border: "none",
	padding: "6px 20px",
	borderRadius: "200px",
	...themeVars.fonts.h6_2,
	cursor: "pointer",
	backgroundColor: colors.grayscale[100],
	color: colors.grayscale[300],

	selectors: {
		"&[data-active='true']": {
			backgroundColor: colors.brand.iris[500],
			color: colors.grayscale[0],
			cursor: "pointer",
		},
	},
});
