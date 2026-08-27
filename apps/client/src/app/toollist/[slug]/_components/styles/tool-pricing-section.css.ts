import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	display: "flex",
	flexDirection: "column",
	gap: "20px",
	padding: "0 24px",
});

export const header = style({
	display: "flex",
	flexDirection: "column",
	gap: "6px",
});

export const title = style({
	...themeVars.fonts.t3_1,
	color: colors.grayscale[900],
});

export const description = style({
	...themeVars.fonts.caption2_1,
	color: colors.grayscale[300],
});

export const descriptionLink = style({
	color: colors.grayscale[300],
	textDecoration: "underline",
});

export const planGroup = style({
	display: "flex",
	flexDirection: "column",
	gap: "8px",
});

export const tabRow = style({
	display: "flex",
	alignItems: "center",
	gap: "8px",
});

export const tab = style({
	...themeVars.fonts.b4_2,
	padding: 0,
	border: "none",
	background: "none",
	color: colors.grayscale[300],
	cursor: "pointer",
});

export const activeTab = style([
	tab,
	{
		...themeVars.fonts.t4_1,
		color: colors.grayscale[900],
	},
]);

export const tabDivider = style({
	width: "1px",
	height: "10px",
	background: colors.grayscale[200],
});

export const planList = style({
	display: "flex",
	flexDirection: "column",
	gap: "8px",
});

export const plan = style({
	display: "flex",
	flexDirection: "column",
	gap: "4px",
	padding: "13px 18px",
	borderRadius: "12px",
	background: colors.grayscale[25],
});

export const planHeader = style({
	display: "flex",
	gap: "4px",
	whiteSpace: "nowrap",
});

export const planName = style({
	...themeVars.fonts.t4_1,
	color: colors.brand.iris[500],
});

export const planPrice = style({
	...themeVars.fonts.t4_1,
	color: colors.grayscale[900],
});

export const priceCurrency = style({
	fontWeight: 400,
});

export const featureList = style({
	paddingInlineStart: "18px",
	listStyleType: "disc",
});

export const featureItem = style({
	...themeVars.fonts.b5_1,
	color: colors.grayscale[500],
});
