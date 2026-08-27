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
		gap: "10px",
		flexShrink: 0,
	},
]);

export const primaryButton = style([
	baseFlexCenter,
	{
		height: "36px",
		borderRadius: "10px",
		gap: "2px",
		padding: "0 14px 0 10px",
		background: colors.brand.iris[500],
		color: colors.grayscale[0],
		fontSize: "14px",
		fontWeight: 600,
		textDecoration: "none",
		whiteSpace: "nowrap",
		transition: "background-color 0.2s ease",

		":hover": {
			background: colors.brand.iris[600],
		},
	},
]);

// 아이콘 호버 전환의 부모 선택자로 쓰이므로 합성(style([...])) 없이 단일 클래스로 둡니다.
export const iconButton = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "36px",
	height: "36px",
	borderRadius: "10px",
	border: "none",
	cursor: "pointer",
	background: colors.brand.iris[100],
	transition: "background-color 0.2s ease",

	":hover": {
		background: colors.brand.iris[200],
	},
});

export const iconSwap = style({
	position: "relative",
	display: "inline-flex",
});

export const iconDefault = style({
	transition: "opacity 0.2s ease",

	selectors: {
		[`${iconButton}:hover &`]: {
			opacity: 0,
		},
	},
});

export const iconHovered = style({
	position: "absolute",
	inset: 0,
	opacity: 0,
	transition: "opacity 0.2s ease",

	selectors: {
		[`${iconButton}:hover &`]: {
			opacity: 1,
		},
	},
});
