import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "src/foundations";

export const containerStyle = style({
	position: "relative",
	display: "flex",
	gap: "10px",
	alignItems: "flex-start",
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

export const uploadButtonRecipe = recipe({
	base: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "120px",
		height: "120px",
		backgroundColor: themeVars.colors.grayscale[25],
		borderRadius: "12px",
		cursor: "pointer",
		transition: "background-color 0.2s, transform 0.2s",

		":hover": {
			backgroundColor: themeVars.colors.grayscale[50],
		},
		":active": {
			transform: "scale(0.95)",
		},
	},
	variants: {
		disabled: {
			true: {
				cursor: "not-allowed",
				opacity: 0.5,
				pointerEvents: "none",
			},
		},
	},
});

export const removeButtonRecipe = recipe({
	base: {
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

		":hover": {
			backgroundColor: themeVars.colors.grayscale[0],
		},

		":active": {
			backgroundColor: themeVars.colors.grayscale[0],
		},
	},

	variants: {
		disabled: {
			true: {
				cursor: "not-allowed",
				pointerEvents: "none",
			},
		},
	},
});
