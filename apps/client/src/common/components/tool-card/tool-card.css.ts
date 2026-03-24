import { themeVars } from "@repo/ui/foundations";
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
	transition: "transform 0.2s ease",
	":hover": {
		transform: "translateY(-4px)",
	},
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
	zIndex: 2,
});

export const hotBadge = style([
	badgeBase,
	{
		top: "-8px",
		left: "-8px",
		width: "32px",
		height: "32px",
	},
]);

export const newBadge = style([
	badgeBase,
	{
		top: "0",
		left: "0",
		padding: "4px 8px",
		backgroundColor: "#E8EFFF",
		color: "#4D7CFF",
		borderRadius: "6px",
		fontSize: "12px",
		fontWeight: 700,
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

export const title = style({
	margin: 0,
	color: themeVars.colors.grayscale[900],
	fontWeight: 700,
	fontSize: "16px",
	lineHeight: "1.4",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
});

export const description = style({
	margin: "2px 0 0 0",
	color: themeVars.colors.grayscale[600],
	fontSize: "13px",
	lineHeight: "1.4",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
});

export const bookmarkButton = style({
	position: "absolute",
	top: "8px",
	right: "8px",
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

export const tag = style({
	padding: "4px 8px",
	borderRadius: "6px",
	backgroundColor: themeVars.colors.grayscale[50],
	color: themeVars.colors.grayscale[500],
	fontSize: "12px",
	fontWeight: 500,
	whiteSpace: "nowrap",
});

export const priceTag = style({
	padding: "4px 8px",
	borderRadius: "6px",
	fontSize: "12px",
	fontWeight: 700,
	whiteSpace: "nowrap",
});

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
