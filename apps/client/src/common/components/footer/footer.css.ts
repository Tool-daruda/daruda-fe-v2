import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";
import { pageContainer } from "@/common/styles/layout.css";

export const footer = style({
	display: "flex",
	justifyContent: "center",
	width: "100%",
	padding: "20px 0 32px",
	backgroundColor: colors.grayscale[25],
});

export const inner = style([
	pageContainer,
	{
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
]);

export const columns = style({
	display: "flex",
	gap: "64px",
	color: colors.grayscale[300],
});

export const column = style({
	display: "flex",
	flexDirection: "column",
	gap: "16px",
	width: "102px",
});

export const policyColumn = style({
	display: "flex",
	flexDirection: "column",
	gap: "2px",
	width: "102px",
});

export const group = style({
	display: "flex",
	flexDirection: "column",
	gap: "2px",
});

export const groupTitle = style({
	...themeVars.fonts.t5_2,
});

export const groupText = style({
	...themeVars.fonts.caption2_2,
});

export const policyList = style({
	display: "flex",
	flexDirection: "column",
	gap: "4px",
	margin: 0,
	padding: 0,
	listStyle: "none",
	whiteSpace: "nowrap",
	...themeVars.fonts.caption2_2,
});
