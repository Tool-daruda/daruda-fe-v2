import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "src/foundations";

export const containerStyle = style({
	position: "relative",
	gap: "10px",
	width: "100%",
});

export const previewContainerStyle = style({
	display: "flex",
	flexWrap: "wrap",
	gap: "12px",
});

export const imagePreviewStyle = style({
	position: "relative",
	width: "120px",
	height: "120px",
	borderRadius: "12px",
	overflow: "hidden",
});

globalStyle(`${imagePreviewStyle} img`, {
	width: "100%",
	height: "100%",
	objectFit: "cover",
});

export const inputStyle = style({
	display: "none",
});

export const uploadButtonBaseStyle = style({
	display: "flex",
	alignItems: "center",
	width: "120px",
	height: "120px",
	padding: "36px 30px 31.2px 37.2px",
	backgroundColor: themeVars.colors.grayscale[25],
	borderRadius: "12px",
	cursor: "pointer",
	transition: "background-color 0.2s, transform 0.2s",
	boxSizing: "border-box",

	selectors: {
		"&:hover": {
			backgroundColor: themeVars.colors.grayscale[50],
		},
	},
});

export const uploadButtonDisabledStyle = style({
	cursor: "not-allowed",
	opacity: 0.5,
	pointerEvents: "none",
});

export const removeButtonBaseStyle = style({
	position: "absolute",
	top: "9px",
	right: "9px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "20px",
	height: "20px",
	border: "none",
	borderRadius: "9999px",
	cursor: "pointer",
	transition: "transform 0.2s, background-color 0.2s",
	background: "rgba(255, 255, 255, 0.50)",

	selectors: {
		"&:hover": {
			backgroundColor: themeVars.colors.grayscale[0],
		},
	},
});

export const removeButtonDisabledStyle = style({
	cursor: "not-allowed",
	pointerEvents: "none",
});

globalStyle(`${removeButtonBaseStyle} svg`, {
	flexShrink: 0,
});
