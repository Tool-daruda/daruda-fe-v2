import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "src/foundations";

export const radioGroupStyle = style({
	display: "flex",
	gap: "24px",
	flexDirection: "row",

	selectors: {
		'&[data-orientation="vertical"]': {
			flexDirection: "column",
		},
	},
});

export const radioItem = style({
	width: "fit-content",
	cursor: "pointer",

	selectors: {
		"&[data-disabled]": {
			cursor: "not-allowed",
			opacity: 0.5,
		},
	},
});

globalStyle(`${radioItem} .ctrl-visual`, {
	display: "flex",
	alignItems: "center",
	gap: "8px",
});

globalStyle(`${radioItem} .dot`, {
	position: "relative",
	width: "14px",
	height: "14px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

const iconBase = style({
	position: "absolute",
	width: "14px",
	height: "14px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	transition: "opacity 0.2s ease-in-out",
});

export const iconUnchecked = style([
	iconBase,
	{
		opacity: 1,
	},
]);

export const iconChecked = style([
	iconBase,
	{
		opacity: 0,
	},
]);

globalStyle(`${radioItem}[data-state="checked"] .${iconUnchecked}`, {
	opacity: 0,
});

globalStyle(`${radioItem}[data-state="checked"] .${iconChecked}`, {
	opacity: 1,
});

globalStyle(`${radioItem} .label`, {
	...themeVars.fonts.t4_1,
	color: themeVars.colors.grayscale[800],
});
