import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

const primaryColor = colors.brand.iris[500];
const borderColor = colors.grayscale[50];

export const pageWrapper = style({
	maxWidth: "800px",
	margin: "0 auto",
	padding: "40px 24px",
});

export const pageTitle = style({
	textAlign: "center",
	...themeVars.fonts.t2_1,
	marginBottom: "24px",
});

export const tabContainer = style({
	display: "flex",
	justifyContent: "center",
	gap: 0,
	borderBottom: `1px solid ${borderColor}`,
	marginBottom: "52px",
});

export const tabItem = style({
	padding: "12px 0",
	width: "120px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	color: colors.grayscale[300],
	textDecoration: "none",
	cursor: "pointer",
	position: "relative",
});

export const activeTabItem = style([
	tabItem,
	{
		color: primaryColor,
		...themeVars.fonts.h4_1,
		"::after": {
			content: '""',
			position: "absolute",
			bottom: "-1px",
			left: "50%",
			transform: "translateX(-50%)",
			width: "42px",
			height: "3px",
			backgroundColor: primaryColor,
		},
	},
]);
