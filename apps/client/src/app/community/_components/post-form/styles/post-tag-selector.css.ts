import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";
import { b3_2Font } from "./typography";

export const wrapper = style({
	display: "flex",
	flexDirection: "column",
	gap: "16px",
	alignItems: "flex-start",
});

export const label = style({
	margin: 0,
	...themeVars.fonts.h4_2,
	color: colors.grayscale[900],
});

export const radioRow = style({
	display: "flex",
	alignItems: "center",
	gap: "32px",
});

export const radioOption = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
	background: "none",
	border: "none",
	padding: 0,
	cursor: "pointer",
});

export const radioLabel = style({
	...b3_2Font,
	color: colors.grayscale[200],
});

export const radioLabelActive = style({
	...themeVars.fonts.t3_1,
	color: colors.brand.iris[500],
});

export const searchArea = style({
	position: "relative",
	width: "263px",
});

export const searchInput = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
	width: "100%",
	boxSizing: "border-box",
	padding: "8px 12px",
	borderRadius: "999px",
	border: `1px solid ${colors.grayscale[50]}`,
	backgroundColor: colors.grayscale[0],

	selectors: {
		"&[data-active='true']": {
			border: `2px solid ${colors.brand.iris[500]}`,
			padding: "7px 11px",
		},
	},
});

export const searchInputField = style({
	flex: 1,
	minWidth: 0,
	border: "none",
	outline: "none",
	background: "transparent",
	...themeVars.fonts.b4_2,
	color: colors.grayscale[900],

	"::placeholder": {
		color: colors.grayscale[200],
	},
});

export const dropdown = style({
	position: "absolute",
	top: "calc(100% + 8px)",
	left: 0,
	width: "100%",
	maxHeight: "176px",
	overflowY: "auto",
	padding: "2px 0",
	borderRadius: "12px",
	border: `1px solid ${colors.grayscale[50]}`,
	backgroundColor: colors.grayscale[0],
	boxShadow: "0px 0px 12px 0px rgba(41, 41, 41, 0.2)",
	zIndex: 20,
});

export const dropdownItem = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
	width: "100%",
	padding: "12px 16px",
	background: "none",
	border: "none",
	cursor: "pointer",
	textAlign: "left",

	":hover": {
		// Figma의 grayscale/gray_30(#F6F6F6)은 토큰에 없어 직접 지정합니다.
		backgroundColor: "#f6f6f6",
	},
});

export const dropdownEmpty = style({
	padding: "12px 16px",
	textAlign: "center",
	...themeVars.fonts.caption2_2,
	color: colors.grayscale[300],
});

export const toolLogo = style({
	position: "relative",
	flexShrink: 0,
	width: "20px",
	height: "20px",
	borderRadius: "4px",
	backgroundColor: colors.grayscale[100],
	overflow: "hidden",
});

export const dropdownItemName = style({
	...themeVars.fonts.b5_2,
	color: colors.grayscale[900],
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

export const chip = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
	width: "fit-content",
	padding: "6px 8px 6px 6px",
	borderRadius: "12px",
	backgroundColor: colors.grayscale[25],
});

export const chipLogo = style({
	position: "relative",
	flexShrink: 0,
	width: "24px",
	height: "24px",
	borderRadius: "4px",
	backgroundColor: colors.grayscale[100],
	overflow: "hidden",
});

export const chipName = style({
	...b3_2Font,
	color: colors.grayscale[900],
});

export const chipRemove = style({
	flexShrink: 0,
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
