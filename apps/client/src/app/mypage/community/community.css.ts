import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const subTabContainer = style({
	display: "flex",
	gap: "24px",
	marginBottom: "20px",
});

export const subTab = style({
	width: "92px",
	height: "32px",
	borderRadius: "200px",
	textDecoration: "none",
	transition: "all 0.2s ease",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

export const activeSubTab = style([
	subTab,
	{
		background: colors.brand.iris[100],
		color: colors.brand.iris[500],
		...themeVars.fonts.h5_1,
	},
]);

export const inactiveSubTab = style([
	subTab,
	{
		color: colors.grayscale[300],
		backgroundColor: "transparent",
		...themeVars.fonts.b4_2,
	},
]);

export const postList = style({
	display: "flex",
	flexDirection: "column",
});
