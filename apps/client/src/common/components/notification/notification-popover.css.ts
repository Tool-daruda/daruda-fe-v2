import { colorTokens, typographyTokens } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const popoverContainer = style({
	position: "absolute",
	top: "calc(100% + 8px)",
	right: 0,
	width: "360px",
	maxHeight: "480px",
	backgroundColor: colorTokens.grayscale[0],
	borderRadius: "12px",
	boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
	border: `1px solid ${colorTokens.grayscale[100]}`,
	display: "flex",
	flexDirection: "column",
	zIndex: 1000,
	overflow: "hidden",
});

export const header = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "16px 20px",
	borderBottom: `1px solid ${colorTokens.grayscale[50]}`,
});

export const headerTitle = style({
	...typographyTokens.h4_1,
	color: colorTokens.grayscale[900],
});

export const unreadBadge = style({
	...typographyTokens.h6_1,
	color: colorTokens.brand.orange[600],
	backgroundColor: colorTokens.brand.orange[50],
	padding: "2px 8px",
	borderRadius: "10px",
});

export const listScrollArea = style({
	display: "flex",
	flexDirection: "column",
	overflowY: "auto",
	maxHeight: "400px",
});

export const emptyState = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	padding: "40px 20px",
	color: colorTokens.grayscale[400],
	...typographyTokens.b4_2,
});
