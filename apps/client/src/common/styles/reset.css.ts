import { globalStyle } from "@vanilla-extract/css";

globalStyle("*, *:before, *:after", {
	boxSizing: "border-box",
	margin: 0,
	padding: 0,
});

globalStyle("button", {
	cursor: "pointer",
	background: "none",
	border: "none",
	padding: 0,
	font: "inherit",
});

globalStyle("a", {
	textDecoration: "none",
	color: "inherit",
});
