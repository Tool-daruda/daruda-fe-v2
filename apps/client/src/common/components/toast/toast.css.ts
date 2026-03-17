import { themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const toastViewport = style({
	position: "fixed",
	left: "3.2rem",
	bottom: "3.2rem",
	zIndex: 9999,
	pointerEvents: "none",
});

export const toast = style({
	display: "inline-flex",
	padding: "1.2rem 2rem",
	justifyContent: "center",
	alignItems: "center",
	gap: "1rem",
	borderRadius: "1rem",
	background: "rgba(22, 22, 22, 0.4)",
	backdropFilter: "blur(0.8rem)",
	WebkitBackdropFilter: "blur(0.8rem)",
	pointerEvents: "auto",
	boxSizing: "border-box",
	maxWidth: "calc(100vw - 6.4rem)",
});

export const message = style({
	...themeVars.fonts.b4_2,
	color: themeVars.colors.grayscale[0],
	whiteSpace: "nowrap",
});
