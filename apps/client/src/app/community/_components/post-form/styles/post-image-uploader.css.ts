import { colors } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const wrapper = style({
	display: "flex",
	alignItems: "center",
	gap: "16px",
	width: "100%",
	boxSizing: "border-box",
	padding: "16px",
	borderRadius: "16px",
	border: `1px solid ${colors.grayscale[50]}`,
	backgroundColor: colors.grayscale[0],
	flexWrap: "wrap",

	selectors: {
		"&[data-dragging='true']": {
			borderColor: colors.brand.iris[300],
			backgroundColor: colors.brand.iris[50],
		},
	},
});

export const addButton = style({
	flexShrink: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "80px",
	height: "80px",
	borderRadius: "8px",
	border: "none",
	backgroundColor: "#f5f5f5",
	cursor: "pointer",
});

export const addButtonDisabled = style({
	cursor: "not-allowed",
	opacity: 0.5,
});

export const hiddenFileInput = style({
	position: "absolute",
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	border: 0,
});

export const thumbnail = style({
	position: "relative",
	flexShrink: 0,
	width: "80px",
	height: "80px",
	borderRadius: "8px",
	backgroundColor: colors.grayscale[100],
	overflow: "hidden",
});

export const thumbnailImg = style({
	width: "100%",
	height: "100%",
	objectFit: "cover",
});

export const removeButton = style({
	position: "absolute",
	top: "6px",
	right: "6px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "20px",
	height: "20px",
	borderRadius: "999px",
	border: "none",
	backgroundColor: "rgba(22, 22, 22, 0.5)",
	cursor: "pointer",
});
