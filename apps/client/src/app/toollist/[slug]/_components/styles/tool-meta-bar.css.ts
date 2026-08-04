import { colors } from "@repo/ui/foundations";
import { style, styleVariants } from "@vanilla-extract/css";

const baseFlexCenter = style({
	display: "flex",
	alignItems: "center",
});

const baseBadge = style({
	fontSize: "13px",
	fontWeight: 500,
	padding: "4px 10px",
	borderRadius: "6px",
});

const baseButton = style([
	baseFlexCenter,
	{
		height: "44px",
		borderRadius: "12px",
		cursor: "pointer",
		border: "none",
		display: "inline-flex",
	},
]);

export const container = style([
	baseFlexCenter,
	{
		justifyContent: "space-between",
		padding: "18px 0 24px",
		gap: "24px",
		borderTop: `1px solid ${colors.grayscale[25]}`,
	},
]);

export const metaItems = style({
	display: "flex",
	alignItems: "flex-start",
	gap: "40px",
	flexWrap: "wrap",
});

export const item = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	gap: "8px",
});

export const label = style({
	fontSize: "13px",
	color: colors.grayscale[200],
	flexShrink: 0,
});

export const valueGroup = style([
	baseFlexCenter,
	{
		gap: "6px",
		flexWrap: "wrap",
	},
]);

export const value = style({
	fontSize: "14px",
	color: colors.grayscale[100],
	fontWeight: 500,
});

export const badge = styleVariants({
	gray: [
		baseBadge,
		{
			color: colors.grayscale[200],
			background: colors.grayscale[25],
		},
	],
	value: [
		baseBadge,
		{
			fontWeight: 600, // value만 다소 두꺼움
			color: colors.brand.iris[500],
			background: colors.brand.iris[100],
		},
	],
});

export const actionGroup = style([
	baseFlexCenter,
	{
		gap: "12px",
		flexShrink: 0,
	},
]);

export const primaryButton = style([
	baseButton,
	{
		gap: "6px",
		padding: "0 20px",
		background: colors.brand.iris[500],
		color: colors.grayscale[0],
		fontSize: "14px",
		fontWeight: 600,
		textDecoration: "none",
		whiteSpace: "nowrap",
	},
]);

export const iconButton = style([
	baseButton,
	{
		width: "44px",
		background: colors.brand.iris[100],
		justifyContent: "center",
		fontSize: "16px",
	},
]);
