import { colors, media, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";
import { pageContainer } from "@/common/styles/layout.css";

export const footer = style({
	display: "flex",
	justifyContent: "center",
	width: "100%",
	padding: "20px 0 32px",
	backgroundColor: colors.grayscale[25],

	"@media": {
		[media.belowMd]: {
			paddingTop: "40px",
			paddingBottom: "calc(40px + env(safe-area-inset-bottom))",
		},
	},
});

export const inner = style([
	pageContainer,
	{
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "space-between",

		"@media": {
			[media.belowMd]: {
				flexDirection: "column",
				gap: "40px",
			},
		},
	},
]);

export const columns = style({
	display: "flex",
	gap: "64px",
	color: colors.grayscale[300],

	"@media": {
		[media.belowMd]: {
			flexDirection: "column",
			gap: "32px",
			width: "100%",
		},
	},
});

export const column = style({
	display: "flex",
	flexDirection: "column",
	gap: "16px",
	width: "102px",

	"@media": {
		[media.belowMd]: {
			flexDirection: "row",
			gap: "16px",
			width: "100%",
		},
	},
});

export const policyColumn = style({
	display: "flex",
	flexDirection: "column",
	gap: "2px",
	width: "102px",

	"@media": {
		[media.belowMd]: {
			width: "100%",
		},
	},
});

export const group = style({
	display: "flex",
	flexDirection: "column",
	gap: "2px",

	"@media": {
		[media.belowMd]: {
			flex: 1,
		},
	},
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

	"@media": {
		[media.belowMd]: {
			flexDirection: "row",
			flexWrap: "wrap",
			gap: "16px",
		},
	},
});

export const bottomRow = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",

	"@media": {
		[media.belowMd]: {
			width: "100%",
		},
	},
});

export const copyright = style({
	margin: 0,
	...themeVars.fonts.caption2_2,
	color: colors.grayscale[300],
	display: "none",

	"@media": {
		[media.belowMd]: {
			display: "block",
		},
	},
});
