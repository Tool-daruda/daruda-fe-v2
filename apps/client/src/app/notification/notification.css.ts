import { colorTokens, typographyTokens } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	maxWidth: "640px",
	margin: "0 auto",
	padding: "40px 24px 80px",
	minHeight: "100vh",
});

export const header = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	marginBottom: "24px",
	paddingBottom: "16px",
	borderBottom: `1px solid ${colorTokens.grayscale[100]}`,
});

export const title = style({
	...typographyTokens.h2_1,
	color: colorTokens.grayscale[900],
});

export const unreadBadge = style({
	...typographyTokens.h5_1,
	color: colorTokens.brand.orange[600],
	backgroundColor: colorTokens.brand.orange[50],
	padding: "4px 12px",
	borderRadius: "16px",
});

export const listArea = style({
	display: "flex",
	flexDirection: "column",
	gap: "8px",
});

export const emptyState = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	padding: "80px 20px",
	color: colorTokens.grayscale[400],
	...typographyTokens.b3_1,
	backgroundColor: colorTokens.grayscale[25],
	borderRadius: "12px",
});
