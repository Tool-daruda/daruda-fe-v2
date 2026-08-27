import { themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";
import { pageContainer } from "@/common/styles/layout.css";

export const header = style({
	width: "100%",
	height: "7.2rem",
	borderBottom: `0.1rem solid ${themeVars.colors.grayscale[25]}`,
	backgroundColor: themeVars.colors.grayscale[0],
	display: "flex",
	justifyContent: "center",
});

export const inner = style([
	pageContainer,
	{
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
]);

export const leftSection = style({
	display: "flex",
	alignItems: "center",
	gap: "2.6rem",
});

export const logo = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "0.4rem 1.2rem",
	textDecoration: "none",
	color: "#111827",
	fontSize: "2rem",
	fontWeight: 700,
	lineHeight: 1,
});

export const nav = style({
	display: "flex",
	alignItems: "center",
	gap: "2rem",
});

export const navLink = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "0.4rem 1.2rem",
	textDecoration: "none",
	...themeVars.fonts.b4_2,
	color: themeVars.colors.grayscale[300],
	whiteSpace: "nowrap",
	transition: "color 0.2s ease",
	selectors: {
		"&:hover": {
			color: themeVars.colors.grayscale[500],
		},
	},
});

export const navLinkActive = style({
	...themeVars.fonts.b4_2,
	color: themeVars.colors.grayscale[700],
});

export const authSection = style({
	display: "flex",
	alignItems: "center",
	gap: "2rem",
});

export const iconButton = style({
	width: "2.8rem",
	height: "2.8rem",
	border: "none",
	background: "transparent",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	padding: 0,
	transition: "opacity 0.15s",
	selectors: {
		"&:hover": {
			opacity: 0.7,
		},
	},
});
