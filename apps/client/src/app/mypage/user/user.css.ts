import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

const primaryColor = colors.brand.iris[500];
const borderColor = colors.grayscale[50];

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
	fontSize: "15px",
	border: "1px solid #E5E5E5",
	borderRadius: "8px",
	outline: "none",
	boxSizing: "border-box",
	marginBottom: "8px",
	transition: "border-color 0.2s",
	":focus": {
		borderColor: "#5B58FF",
	},
});

export const successMessage = style({
	color: colors.system.green.lt,
	fontSize: "13px",
	marginBottom: "12px",
});

export const helpTextList = style({
	listStyle: "none",
	padding: 0,
	margin: 0,
	color: "#666",
	fontSize: "13px",
	lineHeight: "1.6",
	marginBottom: "30px",
});

// 소속 라디오 버튼 그룹
export const radioGroup = style({
	display: "flex",
	gap: "12px",
	marginBottom: "50px",
});

export const radioLabel = style({
	flex: 1,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "8px",
	padding: "12px",
	border: `1px solid ${borderColor}`,
	borderRadius: "8px",
	cursor: "pointer",
	fontSize: "15px",
	color: "#555",
});

export const activeRadioLabel = style([
	radioLabel,
	{
		border: `1.5px solid ${primaryColor}`,
		color: primaryColor,
		fontWeight: "bold",
	},
]);

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
	fontSize: "16px",
	fontWeight: "bold",
	cursor: "pointer",
	padding: "10px",
});

export const textButtonOrange = style([textButtonBase, { color: "#E53E3E" }]);
export const textButtonBlue = style([textButtonBase, { color: "#5B58FF" }]);

export const inputSuccess = style({ borderColor: "#4CAF50", ":focus": { borderColor: "#4CAF50" } });
export const inputError = style({ borderColor: "#E53E3E", ":focus": { borderColor: "#E53E3E" } });

export const messageSuccess = style({
	color: "#4CAF50",
	fontSize: "13px",
	marginBottom: "12px",
});

export const messageError = style({
	color: "#E53E3E",
	fontSize: "13px",
	marginBottom: "12px",
});
