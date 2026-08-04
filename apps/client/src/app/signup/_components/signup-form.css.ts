import { colors, themeVars } from "@repo/ui/foundations";
import { globalStyle, style } from "@vanilla-extract/css";

export const wrapper = style({
	width: "100%",
	maxWidth: "460px",
	margin: "0 auto",
	padding: "64px 0 100px",
});

export const title = style({
	...themeVars.fonts.h2_1,
	color: colors.grayscale["950"],
	marginBottom: "48px",
	textAlign: "center",
});

export const section = style({
	marginBottom: "40px",
});

export const label = style({
	display: "block",
	...themeVars.fonts.t4_1,
	color: colors.grayscale["700"],
	marginBottom: "16px",
});

export const radioGroup = style({
	display: "flex",
	gap: "12px",
});

globalStyle(`${radioGroup} > div[role="radiogroup"]`, {
	display: "flex",
	gap: "12px",
	width: "100%",
});

export const radioItem = style({
	flex: 1,
	padding: "12px 16px",
	border: `1px solid ${colors.grayscale["100"]}`,
	borderRadius: "12px",
	cursor: "pointer",
	color: colors.grayscale["300"],
	...themeVars.fonts.b4_2,
	boxSizing: "border-box",
	textAlign: "center",

	selectors: {
		'&[data-state="checked"]': {
			border: `2px solid ${colors.brand.iris["500"]}`,
			color: colors.brand.iris["500"],
			...themeVars.fonts.t4_1,
		},
	},
});

globalStyle(`${radioItem} .ctrl-visual`, {
	display: "none",
});

export const input = style({
	width: "100%",
	padding: "14px 16px",
	...themeVars.fonts.b4_2,
	color: colors.grayscale["900"],
	border: `1px solid ${colors.grayscale["100"]}`,
	borderRadius: "12px",
	outline: "none",
	boxSizing: "border-box",
	marginBottom: "8px",
	transition: "border-color 0.15s",

	":focus": {
		borderColor: colors.brand.iris["500"],
	},

	"::placeholder": {
		color: colors.grayscale["300"],
	},
});

export const inputError = style({
	borderColor: colors.system.red.lt,
	":focus": { borderColor: colors.system.red.lt },
});

export const inputSuccess = style({
	borderColor: colors.system.green.lt,
	":focus": { borderColor: colors.system.green.lt },
});

export const messageError = style({
	...themeVars.fonts.b5_1,
	color: colors.system.red.lt,
	marginBottom: "10px",
});

export const messageSuccess = style({
	...themeVars.fonts.b5_1,
	color: colors.system.green.lt,
	marginBottom: "10px",
});

export const helpList = style({
	listStyle: "none",
	padding: 0,
	margin: "10px 0 0",
	display: "flex",
	flexDirection: "column",
	gap: "4px",
});

export const helpItem = style({
	...themeVars.fonts.b5_1,
	color: colors.grayscale["400"],
});

export const submitButton = style({
	width: "100%",
	padding: "16px",
	backgroundColor: colors.brand.iris["500"],
	color: colors.grayscale["0"],
	border: "none",
	borderRadius: "12px",
	...themeVars.fonts.t3_1,
	cursor: "pointer",
	transition: "background-color 0.15s, opacity 0.15s",

	":hover": {
		backgroundColor: colors.brand.iris["600"],
	},

	":disabled": {
		backgroundColor: colors.grayscale["100"],
		color: colors.grayscale["300"],
		cursor: "not-allowed",
	},
});
