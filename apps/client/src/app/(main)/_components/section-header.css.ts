import { colors, media, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	marginBottom: "20px",

	"@media": {
		[media.belowMd]: {
			marginBottom: "16px",
		},
	},
});

export const title = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
	margin: 0,
	...themeVars.fonts.t2_1,
	color: colors.grayscale[700],

	"@media": {
		[media.belowMd]: {
			...themeVars.fonts.t3_1,
		},
	},
});

export const moreLink = style({
	padding: "2px 4px",
	...themeVars.fonts.b4_1,
	color: colors.grayscale[300],
	textDecoration: "none",

	"@media": {
		[media.belowMd]: {
			...themeVars.fonts.caption1_1,
		},
	},
});
