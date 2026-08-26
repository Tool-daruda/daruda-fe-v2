import { colors, themeVars } from "@repo/ui/foundations";
import { style, styleVariants } from "@vanilla-extract/css";

export const card = style({
	position: "relative",
	display: "flex",
	flexDirection: "column",
	backgroundColor: themeVars.colors.grayscale[0],
	border: `1px solid ${themeVars.colors.grayscale[25]}`,
	boxSizing: "border-box",
	textDecoration: "none",
	width: "100%",
	maxWidth: "244px",

	selectors: {
		"&:hover": {
			backgroundColor: themeVars.colors.grayscale[30],
		},
	},
});

export const variant = styleVariants({
	vertical: {
		minWidth: "188px",
		height: "150px",
		padding: "16px",
		borderRadius: "16px",
	},
	horizontal: {
		minWidth: "244px",
		minHeight: "130px",
		padding: "14px",
		gap: "8px",
		borderRadius: "16px",
	},
	alternative: {
		padding: "14px 14px 12px",
		gap: "8px",
		borderRadius: "12px",
	},
});

export const body = style({
	display: "flex",
	minWidth: 0,
});

export const bodyVariant = styleVariants({
	vertical: { flexDirection: "column" },
	horizontal: { flexDirection: "row", gap: "14px" },
	alternative: { flexDirection: "row", gap: "14px", alignItems: "flex-start", width: "100%" },
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
	backgroundColor: themeVars.colors.grayscale[100],
	overflow: "hidden",
});

export const thumbnailVariant = styleVariants({
	vertical: { width: "60px", height: "60px", borderRadius: "8px", marginBottom: "11px" },
	horizontal: { width: "60px", height: "60px", borderRadius: "8px" },
	alternative: { width: "60px", height: "60px", borderRadius: "8px" },
});

export const thumbnailImage = style({ objectFit: "cover" });

export const textBlock = style({
	display: "flex",
	flexDirection: "column",
	minWidth: 0,
	flex: 1,
});

export const textBlockVariant = styleVariants({
	vertical: {},
	horizontal: {
		paddingRight: "16px",
	},
	alternative: {},
});

export const title = style({
	margin: 0,
	color: themeVars.colors.grayscale[900],
	...themeVars.fonts.t4_1,
});

export const titleVariant = styleVariants({
	vertical: {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	horizontal: {
		color: themeVars.colors.grayscale[700],
		whiteSpace: "normal",
		wordBreak: "keep-all",
	},
	alternative: {
		color: themeVars.colors.grayscale[700],
		whiteSpace: "normal",
		wordBreak: "keep-all",
	},
});

export const description = style({
	margin: "2px 0 0 0",
	color: themeVars.colors.grayscale[600],
	...themeVars.fonts.caption2_1,
	display: "-webkit-box",
	WebkitLineClamp: 2,
	WebkitBoxOrient: "vertical",
	overflow: "hidden",
});

export const bookmarkButton = style({
	position: "absolute",
	top: "12px",
	right: "14px",
	zIndex: 3,
	border: 0,
	padding: 0,
	background: "transparent",
	cursor: "pointer",
	lineHeight: 0,
});

export const tagList = style({
	display: "flex",
	gap: "4px",
	alignItems: "center",
	marginTop: "auto",
	flexShrink: 0,
	overflow: "hidden",
});

const baseTag = style({
	padding: "2px 6px",
	borderRadius: "4px",
	...themeVars.fonts.b5_2,
	whiteSpace: "nowrap",
});

export const tag = style([
	baseTag,
	{
		backgroundColor: themeVars.colors.grayscale[25],
		color: themeVars.colors.grayscale[300],
	},
]);

export const priceTag = style([baseTag, { flexShrink: 0 }]);

export const priceTone = styleVariants({
	free: {
		backgroundColor: themeVars.colors.brand.orange[100],
		color: themeVars.colors.brand.orange[500],
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
