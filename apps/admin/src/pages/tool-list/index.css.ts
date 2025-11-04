import { themeVars } from "@repo/ui";
import { style } from "@vanilla-extract/css";

export const title = style({
	...themeVars.fonts.t2_1,
	color: themeVars.colors.grayscale[800],
	marginBottom: "2.4rem",
});

export const toolCount = style({
	color: themeVars.colors.brand.iris[500],
});

export const listHeader = style({
	position: "sticky",
	top: 0,
	zIndex: 10,
	padding: "1.4rem 0",
	backgroundColor: themeVars.colors.grayscale[0],
	borderBottom: `1px solid ${themeVars.colors.grayscale[100]}`,
});

export const tableHeader = style({
	display: "flex",
	gap: "1.6rem",
	...themeVars.fonts.caption1_1,
	color: themeVars.colors.grayscale[500],
});

export const paginationStyle = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	marginTop: "4.4rem",
});
