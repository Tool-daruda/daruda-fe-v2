import { colors, themeVars } from "@repo/ui/foundations";
import { style, styleVariants } from "@vanilla-extract/css";

export const card = style({
	position: "relative",
	display: "flex",
	backgroundColor: themeVars.colors.grayscale[0],
	border: `1px solid ${themeVars.colors.grayscale[25]}`,
	borderRadius: "16px",
	boxSizing: "border-box",
	textDecoration: "none",
	width: "100%",
	maxWidth: "244px",
});

export const variant = styleVariants({
	vertical: {
		flexDirection: "column",
		minWidth: "188px",
		height: "150px",
		padding: "14px",
	},
	horizontal: {
		flexDirection: "row",
		minWidth: "244px",
		height: "126px",
		padding: "14px",
		gap: "12px",
		alignItems: "center",
	},
});

export const thumbnailSection = style({
	position: "relative",
	flexShrink: 0,
});

const badgeBase = style({
	position: "absolute",
	top: "-6px",
	left: "-6px",
	zIndex: 2,
});

export const hotBadge = style([
	badgeBase,
	{
		width: "24px",
		height: "24px",
	},
]);

export const newBadge = style([
	badgeBase,
	{
		padding: "4px 8px",
		border: `1px solid ${colors.grayscale[0]}`,
		color: colors.brand.iris[500],
		backgroundColor: colors.brand.iris[100],
		borderRadius: "4px",
		...themeVars.fonts.b5_2,
	},
]);

export const thumbnail = style({
	position: "relative",
	borderRadius: "12px",
	backgroundColor: themeVars.colors.grayscale[100],
	overflow: "hidden",
});

export const thumbnailVariant = styleVariants({
	vertical: { width: "80px", height: "80px", marginBottom: "8px" },
	horizontal: { width: "74px", height: "74px" },
});

export const thumbnailImage = style({ objectFit: "cover" });

export const content = style({
	display: "flex",
	flexDirection: "column",
	flex: 1,
	minWidth: 0,
	height: "100%",
});

export const topRow = style({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "flex-start",
	width: "100%",
});

export const textBlock = style({
	display: "flex",
	flexDirection: "column",
	minWidth: 0,
	flex: 1,
});

export const textBlockVariant = styleVariants({
	vertical: {},
	horizontal: {
		maxWidth: "114px",
	},
});

export const title = style({
	margin: 0,
	color: themeVars.colors.grayscale[900],
	...themeVars.fonts.t4_1,
	lineHeight: "1.4",
});

export const titleVariant = styleVariants({
	vertical: {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	horizontal: {
		whiteSpace: "normal",
		wordBreak: "keep-all",
	},
});

export const description = style({
	margin: "2px 0 0 0",
	color: themeVars.colors.grayscale[600],
	...themeVars.fonts.caption2_1,
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
});

export const bookmarkButton = style({
	position: "absolute",
	top: "8px",
	right: "8px",
	zIndex: 3,
	border: 0,
	padding: 0,
	background: "transparent",
	cursor: "pointer",
	lineHeight: 0,
});

export const bottomRow = style({
	marginTop: "auto",
});

export const tagList = style({
	display: "flex",
	gap: "4px",
	alignItems: "center",
	overflow: "hidden",
});
const baseTag = style({
	padding: "2px 6px",
	borderRadius: "4px",
	...themeVars.fonts.b5_2,
	whiteSpace: "nowrap",
});

export const tag = style({
	padding: "2px 6px",
	borderRadius: "4px",
	backgroundColor: themeVars.colors.grayscale[25],
	color: themeVars.colors.grayscale[300],
	...themeVars.fonts.b5_2,
	whiteSpace: "nowrap",
});

export const priceTag = style([baseTag]);

export const priceTone = styleVariants({
	free: {
		backgroundColor: themeVars.colors.brand.orange[50],
		color: themeVars.colors.brand.orange[600],
	},
	paid: {
		backgroundColor: themeVars.colors.brand.iris[50],
		color: themeVars.colors.brand.iris[600],
	},
	partial: {
		backgroundColor: themeVars.colors.brand.iris[50],
		color: themeVars.colors.brand.iris[600],
	},
});
