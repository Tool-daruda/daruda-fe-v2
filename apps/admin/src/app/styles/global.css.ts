import { globalStyle } from "@vanilla-extract/css";

globalStyle("html", {
	fontSize: "62.5%",
});

globalStyle("*, *::before, *::after", {
	boxSizing: "border-box",
	margin: 0,
	padding: 0,
});
