import { themeVars } from "@repo/ui";
import { style } from "@vanilla-extract/css";
import { zIndex } from "@/shared/constants/z-index";

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
	zIndex: zIndex.HEADER,
	padding: "1.4rem 0",
	backgroundColor: themeVars.colors.grayscale[0],
	borderBottom: `1px solid ${themeVars.colors.grayscale[100]}`,
});

const baseTableText = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};

export const tableHeader = style({
	display: "flex",
	...themeVars.fonts.caption1_1,
	color: themeVars.colors.grayscale[500],

	width: "100%",
	alignItems: "center",
	gap: "4.4rem",
	alignSelf: "stretch",
	textAlign: "center",
});

export const toolHead = style({
	gap: "1.6rem",
	...baseTableText,
});

export const toolName = style({
	width: "12.6rem",
	height: "4rem",
	...baseTableText,
});

export const toolDescription = style({
	width: "26.1rem",
	height: "4rem",
	...baseTableText,
});

export const toolCategory = style({
	width: "15rem",
	...baseTableText,
});

export const toolCreatedAt = style({
	width: "15rem",
	...baseTableText,
});

export const toolSetting = style({
	width: "5.6rem",
	...baseTableText,
});

export const paginationStyle = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	marginTop: "4.4rem",
});
