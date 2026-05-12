import { colors } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	marginBottom: "20px",
	paddingTop: "40px",
	paddingBottom: "50px",
	textAlign: "center",
	background: colors.brand.iris[50],
});

export const title = style({
	fontSize: "24px",
	fontWeight: "700",
	color: "#5C5CFF",
	marginBottom: "24px",
});

export const inputWrapper = style({
	position: "relative",
	width: "100%",
	maxWidth: "600px",
});

export const input = style({
	width: "100%",
	padding: "16px 24px",
	paddingRight: "50px",
	borderRadius: "30px",
	boxSizing: "border-box",
	border: "1px solid #E5E7EB",
	fontSize: "16px",
	backgroundColor: "#fff",
	outline: "none",
	transition: "border-color 0.2s ease",
	":focus": {
		borderColor: "#5C5CFF",
	},
});

export const searchIcon = style({
	position: "absolute",
	right: "24px",
	top: "50%",
	transform: "translateY(-50%)",
	color: "#5C5CFF",
	cursor: "pointer",
});
