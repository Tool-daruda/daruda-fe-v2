import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const dialog = style({
	border: "none",
	borderRadius: "16px",
	padding: 0,
	width: "480px",
	maxWidth: "calc(100vw - 32px)",
	boxShadow: "0 8px 32px rgba(41, 41, 41, 0.24)",
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	margin: 0,
	selectors: {
		"&::backdrop": {
			background: "rgba(0, 0, 0, 0.4)",
		},
	},
});

export const inner = style({
	padding: "24px",
	display: "flex",
	flexDirection: "column",
	gap: "20px",
});

export const header = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
});

export const title = style({
	margin: 0,
	...themeVars.fonts.h3_1,
	color: colors.grayscale[900],
});

export const xButton = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "28px",
	height: "28px",
	background: "none",
	border: "none",
	cursor: "pointer",
	...themeVars.fonts.b3_1,
	color: colors.grayscale[400],
});

export const section = style({
	display: "flex",
	flexDirection: "column",
	gap: "8px",
});

export const label = style({
	...themeVars.fonts.t4_1,
	color: colors.grayscale[700],
});

export const required = style({
	color: colors.brand.iris[500],
});

export const optional = style({
	...themeVars.fonts.caption1_1,
	color: colors.grayscale[300],
});

export const contentPreview = style({
	margin: 0,
	padding: "10px 12px",
	borderRadius: "8px",
	backgroundColor: colors.grayscale[25],
	...themeVars.fonts.b4_1,
	color: colors.grayscale[600],
	overflow: "hidden",
	display: "-webkit-box",
	WebkitLineClamp: 2,
	WebkitBoxOrient: "vertical",
});

export const charCount = style({
	alignSelf: "flex-end",
	...themeVars.fonts.caption2_1,
	color: colors.grayscale[300],
});

export const radioGroup = style({
	display: "grid",
	gridTemplateColumns: "1fr 1fr",
	gap: "8px",
});

export const radioLabel = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
	...themeVars.fonts.b4_1,
	color: colors.grayscale[700],
	cursor: "pointer",
});

export const radioInput = style({
	accentColor: colors.brand.iris[500],
	width: "16px",
	height: "16px",
	flexShrink: 0,
	cursor: "pointer",
});

export const input = style({
	width: "100%",
	padding: "10px 12px",
	border: `1px solid ${colors.grayscale[100]}`,
	borderRadius: "8px",
	...themeVars.fonts.b4_1,
	color: colors.grayscale[900],
	boxSizing: "border-box",
	outline: "none",
	selectors: {
		"&:focus": {
			borderColor: colors.brand.iris[400],
		},
		"&::placeholder": {
			color: colors.grayscale[200],
		},
	},
});

export const textarea = style({
	width: "100%",
	padding: "10px 12px",
	border: `1px solid ${colors.grayscale[100]}`,
	borderRadius: "8px",
	...themeVars.fonts.b4_1,
	color: colors.grayscale[900],
	boxSizing: "border-box",
	outline: "none",
	resize: "vertical",
	minHeight: "96px",
	selectors: {
		"&:focus": {
			borderColor: colors.brand.iris[400],
		},
		"&::placeholder": {
			color: colors.grayscale[200],
		},
	},
});

export const errorMessage = style({
	margin: 0,
	...themeVars.fonts.caption1_1,
	color: "#ef4444",
});

export const actions = style({
	display: "flex",
	gap: "8px",
	justifyContent: "flex-end",
});

export const cancelButton = style({
	padding: "10px 20px",
	borderRadius: "8px",
	border: `1px solid ${colors.grayscale[100]}`,
	background: "none",
	...themeVars.fonts.b4_1,
	color: colors.grayscale[600],
	cursor: "pointer",
});

export const submitButton = style({
	padding: "10px 20px",
	borderRadius: "8px",
	border: "none",
	backgroundColor: colors.brand.iris[500],
	...themeVars.fonts.b4_1,
	color: colors.grayscale[0],
	cursor: "pointer",
	selectors: {
		"&:disabled": {
			opacity: 0.5,
			cursor: "not-allowed",
		},
	},
});

export const successState = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "8px",
	padding: "16px 0",
	textAlign: "center",
});

export const successTitle = style({
	margin: 0,
	...themeVars.fonts.t3_1,
	color: colors.grayscale[900],
});

export const successDesc = style({
	margin: 0,
	...themeVars.fonts.b4_1,
	color: colors.grayscale[400],
});

export const closeButton = style({
	marginTop: "8px",
	padding: "10px 24px",
	borderRadius: "8px",
	border: "none",
	backgroundColor: colors.brand.iris[500],
	...themeVars.fonts.b4_1,
	color: colors.grayscale[0],
	cursor: "pointer",
});
