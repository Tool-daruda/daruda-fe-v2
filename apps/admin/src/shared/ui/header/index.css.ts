import { themeVars } from "@repo/ui";
import { style } from "@vanilla-extract/css";

export const headerStyle = style({
	display: "flex",
	alignItems: "center",
	width: "100%",
	padding: "1.6rem 18rem",
});

export const logoStyle = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.6rem",

	marginRight: "4.8rem",
	color: themeVars.colors.grayscale[800],
	...themeVars.fonts.t2_1,
});

export const navStyle = style({
	display: "flex",
	alignItems: "center",
	gap: "4.4rem",
});

export const linkStyle = style({
	textDecoration: "none",
	color: themeVars.colors.grayscale[300],
	...themeVars.fonts.b4_2,

	selectors: {
		"&.active": {
			color: themeVars.colors.grayscale[600],
		},
	},
});

export const primaryLink = style({
	marginLeft: "auto",
	color: themeVars.colors.brand.iris[600],
});
