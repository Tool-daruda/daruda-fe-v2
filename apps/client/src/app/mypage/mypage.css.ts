import { style } from "@vanilla-extract/css";

const primaryColor = "#5B58FF";
const borderColor = "#E5E5E5";

export const pageWrapper = style({
	maxWidth: "800px",
	margin: "0 auto",
	padding: "40px 20px",
	fontFamily: "sans-serif",
});

export const pageTitle = style({
	textAlign: "center",
	fontSize: "24px",
	fontWeight: "bold",
	marginBottom: "30px",
});

export const tabContainer = style({
	display: "flex",
	justifyContent: "center",
	gap: "40px",
	borderBottom: `1px solid ${borderColor}`,
	marginBottom: "50px",
});

export const tabItem = style({
	padding: "10px 0",
	fontSize: "16px",
	color: "#888",
	textDecoration: "none",
	cursor: "pointer",
	position: "relative",
	fontWeight: "500",
});

export const activeTabItem = style([
	tabItem,
	{
		color: primaryColor,
		fontWeight: "bold",
		"::after": {
			content: '""',
			position: "absolute",
			bottom: "-1px",
			left: 0,
			width: "100%",
			height: "3px",
			backgroundColor: primaryColor,
		},
	},
]);

// 프로필 폼 스타일
export const formWrapper = style({
	maxWidth: "460px",
	margin: "0 auto",
});

export const sectionTitle = style({
	fontSize: "18px",
	fontWeight: "bold",
	textAlign: "center",
	marginBottom: "40px",
});

export const label = style({
	display: "block",
	fontSize: "14px",
	fontWeight: "bold",
	marginBottom: "10px",
});

export const inputField = style({
	width: "100%",
	padding: "14px 16px",
	fontSize: "15px",
	border: "1px solid #4CAF50", // 성공 상태 테두리
	borderRadius: "8px",
	outline: "none",
	boxSizing: "border-box",
	marginBottom: "8px",
});

export const successMessage = style({
	color: "#4CAF50",
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
