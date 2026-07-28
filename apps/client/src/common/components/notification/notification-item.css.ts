import { colorTokens, typographyTokens } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const itemWrapper = style({
	display: "flex",
	flexDirection: "column",
	gap: "6px",
	padding: "12px 16px",
	borderRadius: "8px",
	cursor: "pointer",
	transition: "background-color 0.2s ease",
	borderBottom: `1px solid ${colorTokens.grayscale[50]}`,
	textDecoration: "none",
	selectors: {
		"&:hover": {
			backgroundColor: colorTokens.grayscale[50],
		},
		"&:last-child": {
			borderBottom: "none",
		},
	},
});

export const unreadItem = style({
	backgroundColor: colorTokens.grayscale[25],
});

export const readItem = style({
	backgroundColor: colorTokens.grayscale[0],
});

export const headerRow = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
});

export const badgeWrapper = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
});

export const typeBadge = style({
	...typographyTokens.h6_2,
	padding: "2px 6px",
	borderRadius: "4px",
});

export const commentBadge = style([
	typeBadge,
	{
		color: colorTokens.brand.iris[600],
		backgroundColor: colorTokens.brand.iris[50],
	},
]);

export const noticeBadge = style([
	typeBadge,
	{
		color: colorTokens.brand.orange[600],
		backgroundColor: colorTokens.brand.orange[50],
	},
]);

export const titleText = style({
	...typographyTokens.h5_1,
	color: colorTokens.grayscale[900],
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

export const timeText = style({
	...typographyTokens.caption2_1,
	color: colorTokens.grayscale[400],
});

export const contentText = style({
	...typographyTokens.b5_1,
	color: colorTokens.grayscale[600],
	display: "-webkit-box",
	WebkitLineClamp: 2,
	WebkitBoxOrient: "vertical",
	overflow: "hidden",
	lineHeight: "1.4",
});

export const unreadDot = style({
	width: "6px",
	height: "6px",
	borderRadius: "50%",
	backgroundColor: colorTokens.brand.orange[500],
});
