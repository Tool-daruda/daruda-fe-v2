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

export const lightboxBackdrop = style({
	position: "fixed",
	inset: 0,
	zIndex: 100,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: "rgba(22, 22, 22, 0.4)",
	padding: "20px",
});

export const lightboxOverlayButton = style({
	position: "absolute",
	inset: 0,
	background: "none",
	border: "none",
	padding: 0,
	cursor: "default",
});

export const lightboxFigure = style({
	position: "relative",
	width: "768px",
	maxWidth: "100%",
	paddingTop: "46px",
});

export const lightboxImageWrapper = style({
	position: "relative",
	width: "100%",
	height: "432px",
	maxHeight: "70vh",
	borderRadius: "8px",
	backgroundColor: colors.grayscale[400],
	overflow: "hidden",
});

export const lightboxCloseButton = style({
	position: "absolute",
	top: 0,
	right: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "36px",
	height: "36px",
	background: "none",
	border: "none",
	padding: 0,
	cursor: "pointer",
});
