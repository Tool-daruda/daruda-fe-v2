import { style } from "@vanilla-extract/css";

export const container = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	paddingTop: "60px",
});

export const title = style({
	fontSize: "20px",
	fontWeight: "bold",
	color: "#222",
	marginBottom: "40px",
});

export const warningList = style({
	listStyleType: "disc",
	paddingLeft: "20px",
	color: "#555",
	fontSize: "15px",
	lineHeight: "1.8",
	marginBottom: "60px",
	wordBreak: "keep-all",
});

export const withdrawButton = style({
	padding: "16px 56px",
	backgroundColor: "#FDECE9",
	color: "#E53E3E",
	border: "none",
	borderRadius: "8px",
	fontSize: "16px",
	fontWeight: "bold",
	cursor: "pointer",
	transition: "background-color 0.2s ease",
	":hover": {
		backgroundColor: "#FBD5CE",
	},
});
