import { colors, themeVars } from "@repo/ui/foundations";
import { globalStyle, style } from "@vanilla-extract/css";

const primaryColor = colors.brand.iris[500];
const borderColor = colors.grayscale[200];

export const formWrapper = style({
	width: "100%",
	maxWidth: "460px",
	margin: "0 auto",
});

export const sectionTitle = style({
	...themeVars.fonts.h4_2,
	textAlign: "center",
	marginBottom: "48px",
});

export const label = style({
	display: "block",
	...themeVars.fonts.t4_1,
	marginBottom: "32px",
});

export const inputField = style({
	width: "100%",
	padding: "14px 16px",
	...themeVars.fonts.b4_2,
	color: colors.grayscale[900],
	border: `1px solid ${borderColor}`,
	borderRadius: "12px",
	outline: "none",
	boxSizing: "border-box",
	marginBottom: "10px",
});

export const successMessage = style({
	color: colors.system.green.lt,
	...themeVars.fonts.b4_1,
	marginBottom: "10px",
});

export const helpTextList = style({
	listStyle: "none",
	padding: 0,
	margin: 0,
	color: colors.grayscale[600],
	...themeVars.fonts.b4_1,
	marginBottom: "48px",
});

export const radioGroup = style({
	display: "flex",
	gap: "16px",
	marginBottom: "80px",
});

export const customRadio = style({
	flex: 1,
	padding: "12px 16px",
	border: `1px solid ${borderColor}`,
	borderRadius: "12px",
	cursor: "pointer",
	color: colors.grayscale[300],
	...themeVars.fonts.b4_2,
	boxSizing: "border-box",

	selectors: {
		'&[data-state="checked"]': {
			border: `2px solid ${primaryColor}`,
			color: primaryColor,
			...themeVars.fonts.t4_1,
		},
	},
});

globalStyle(`${radioGroup} > div[role="radiogroup"]`, {
	width: "100%",
});

globalStyle(`${customRadio} .ctrl-visual`, {
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "space-between",
	flexDirection: "row-reverse",
});

globalStyle(`${customRadio} .label`, {
	whiteSpace: "nowrap",
});

export const submitButton = style({
	width: "100%",
	padding: "16px",
	backgroundColor: primaryColor,
	color: "white",
	border: "none",
	borderRadius: "8px",
	fontSize: "16px",
	fontWeight: "bold",
	cursor: "pointer",
	marginTop: "20px",
	transition: "background-color 0.2s",
	":hover": {
		backgroundColor: "#4946E6",
	},
});

export const infoContainer = style({
	display: "flex",
	flexDirection: "column",
	gap: "30px",
	marginBottom: "60px",
	padding: "0 20px",
});

export const infoRow = style({
	display: "flex",
	alignItems: "center",
});

export const infoLabel = style({
	width: "100px",
	fontSize: "15px",
	fontWeight: "bold",
	color: "#333",
});

export const infoValue = style({
	fontSize: "15px",
	color: "#5B58FF",
});

export const actionButtonGroup = style({
	display: "flex",
	justifyContent: "center",
	gap: "60px",
	marginTop: "40px",
});

export const textButtonBase = style({
	background: "none",
	border: "none",
	...themeVars.fonts.b4_1,
	cursor: "pointer",
	padding: "10px",
});

export const textButtonOrange = style([textButtonBase, { color: colors.brand.orange[500] }]);
export const textButtonBlue = style([textButtonBase, { color: colors.brand.iris[500] }]);

export const inputSuccess = style({
	borderColor: colors.system.green.lt,
	":focus": { borderColor: colors.system.green.lt },
});
export const inputError = style({
	borderColor: colors.system.red.lt,
	":focus": { borderColor: colors.system.red.lt },
});

export const messageSuccess = style({
	color: colors.system.green.lt,
	...themeVars.fonts.b4_1,
	marginBottom: "12px",
});

export const messageError = style({
	color: colors.system.red.lt,
	...themeVars.fonts.b4_1,
	marginBottom: "12px",
});
