import { colors } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "14px 0",
	gap: "24px",
	borderRadius: "16px",
	border: `1px solid ${colors.grayscale[25]}`,
	background: colors.grayscale[0],
});

export const metaItems = style({
	display: "flex",
	alignItems: "center",
	gap: "24px",
	flexWrap: "wrap",
});

export const item = style({
	display: "flex",
	alignItems: "center",
	gap: "8px",
});

export const label = style({
	fontSize: "13px",
	color: colors.grayscale[100],
	flexShrink: 0,
});

export const value = style({
	fontSize: "13px",
	color: colors.grayscale[100],
	fontWeight: 500,
});

export const valueBadge = style({
	fontSize: "12px",
	fontWeight: 600,
	color: colors.brand.iris[500],
	background: colors.brand.iris[100],
	padding: "2px 8px",
	borderRadius: "6px",
});

export const actionGroup = style({
	display: "flex",
	alignItems: "center",
	gap: "8px",
	flexShrink: 0,
});

export const primaryButton = style({
	display: "inline-flex",
	alignItems: "center",
	gap: "4px",
	height: "40px",
	padding: "0 16px",
	border: "none",
	borderRadius: "10px",
	background: colors.brand.iris[500],
	color: colors.grayscale[0],
	fontSize: "14px",
	fontWeight: 600,
	cursor: "pointer",
	textDecoration: "none",
	whiteSpace: "nowrap",
});

export const iconButton = style({
	width: "40px",
	height: "40px",
	borderRadius: "10px",
	border: `1px solid ${colors.grayscale[300]}`,
	background: colors.grayscale[0],
	cursor: "pointer",
	fontSize: "16px",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
});
