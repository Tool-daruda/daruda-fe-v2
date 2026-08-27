import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";
import { pageContainer } from "@/common/styles/layout.css";

export const container = style({
	display: "flex",
	justifyContent: "center",
	width: "100%",
	minHeight: "268px",
	overflow: "hidden",
	background: colors.brand.iris[50],
});

export const inner = style([
	pageContainer,
	{
		position: "relative",
		paddingTop: "30px",
		paddingBottom: "28px",
	},
]);

export const decorativeImage = style({
	position: "absolute",
	right: "-49px",
	top: "13px",
	pointerEvents: "none",
	"@media": {
		"screen and (max-width: 1024px)": {
			display: "none",
		},
	},
});

export const contentGroup = style({
	position: "relative",
	zIndex: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	gap: "16px",
	width: "100%",
});

export const titleGroup = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
});

export const subTitle = style({
	margin: 0,
	...themeVars.fonts.b1_1,
	color: colors.brand.iris[400],
});

export const title = style({
	margin: 0,
	...themeVars.fonts.h2_1,
	color: colors.brand.iris[500],
});

export const inputWrapper = style({
	display: "flex",
	alignItems: "center",
	gap: "8px",
	width: "100%",
	maxWidth: "440px",
	padding: "12px 24px",
	borderRadius: "60px",
	boxSizing: "border-box",
	border: `1px solid ${colors.brand.iris[200]}`,
	backgroundColor: colors.grayscale[0],
});

export const input = style({
	flex: 1,
	minWidth: 0,
	border: "none",
	outline: "none",
	backgroundColor: "transparent",
	...themeVars.fonts.caption1_1,
	color: colors.grayscale[900],
	"::placeholder": {
		color: colors.grayscale[300],
	},
});

export const searchIcon = style({
	display: "flex",
	flexShrink: 0,
});

export const categorySection = style({
	paddingLeft: "8px",
});

export const categoryList = style({
	display: "flex",
	flexWrap: "wrap",
	alignItems: "center",
	gap: "6px",
	maxWidth: "496px",
});

const categoryChipBase = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "4px 10px",
	borderRadius: "39px",
	textDecoration: "none",
	whiteSpace: "nowrap",
});

export const categoryChip = style([
	categoryChipBase,
	{
		backgroundColor: colors.grayscale[0],
		color: colors.grayscale[300],
		...themeVars.fonts.caption2_1,
	},
]);

export const categoryChipActive = style([
	categoryChipBase,
	{
		backgroundColor: colors.brand.iris[500],
		color: colors.grayscale[0],
		...themeVars.fonts.b5_1,
	},
]);
