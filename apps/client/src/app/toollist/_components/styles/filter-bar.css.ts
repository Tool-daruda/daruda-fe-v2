import { colors } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	marginBottom: "20px",
});

export const toggleWrapper = style({
	display: "flex",
	alignItems: "center",
	gap: "12px",
	cursor: "pointer",
});

export const toggleLabel = style({
	fontSize: "16px",
	fontWeight: "600",
	color: "#333",
});

export const switchRoot = style({
	width: "50px",
	height: "26px",
	backgroundColor: colors.grayscale[100],
	borderRadius: "999px",
	position: "relative",
	transition: "background-color 0.2s ease",
	selectors: {
		"&[data-state='checked']": {
			backgroundColor: colors.brand.iris[500],
		},
	},
});

export const switchThumb = style({
	width: "20px",
	height: "20px",
	backgroundColor: colors.grayscale[0],
	borderRadius: "50%",
	position: "absolute",
	top: "3px",
	left: "3px",
	transition: "transform 0.2s ease",
	selectors: {
		"[data-state='checked'] &": {
			transform: "translateX(24px)",
		},
	},
});

export const sortWrapper = style({
	display: "flex",
	alignItems: "center",
	gap: "8px",
	fontSize: "14px",
	color: "#9CA3AF",
});

export const sortItem = style({
	cursor: "pointer",
	selectors: {
		"&.active": {
			color: "#111",
			fontWeight: "600",
		},
		"&:hover": {
			textDecoration: "underline",
			textUnderlineOffset: "1.2px",
			fontWeight: "600",
		},
	},
});

export const divider = style({
	width: "1px",
	height: "12px",
	backgroundColor: "#E5E7EB",
});
