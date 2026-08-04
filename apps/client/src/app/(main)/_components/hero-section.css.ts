import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	gap: "8px",
	padding: "48px 24px 32px",
	background: colors.brand.iris[50],
});

export const subTitle = style({
	margin: 0,
	...themeVars.fonts.b4_1,
	color: colors.brand.iris[400],
});

export const title = style({
	margin: 0,
	marginBottom: "20px",
	...themeVars.fonts.h2_1,
	color: colors.brand.iris[600],
});

export const inputWrapper = style({
	position: "relative",
	width: "100%",
	maxWidth: "480px",
});

export const input = style({
	width: "100%",
	padding: "14px 20px",
	paddingRight: "48px",
	borderRadius: "30px",
	boxSizing: "border-box",
	border: `1px solid ${colors.brand.iris[200]}`,
	...themeVars.fonts.caption1_1,
	backgroundColor: colors.grayscale[0],
	outline: "none",
});

export const searchIcon = style({
	position: "absolute",
	right: "20px",
	top: "50%",
	transform: "translateY(-50%)",
});

export const categoryList = style({
	display: "flex",
	flexWrap: "wrap",
	gap: "8px",
	marginTop: "20px",
});

const categoryChipBase = style({
	padding: "8px 14px",
	borderRadius: "20px",
	textDecoration: "none",
	...themeVars.fonts.b5_1,
	whiteSpace: "nowrap",
});

export const categoryChip = style([
	categoryChipBase,
	{
		backgroundColor: colors.grayscale[0],
		color: colors.grayscale[500],
	},
]);

export const categoryChipActive = style([
	categoryChipBase,
	{
		backgroundColor: colors.brand.iris[500],
		color: colors.grayscale[0],
	},
]);
