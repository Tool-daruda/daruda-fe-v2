import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";
import { pageContainer } from "@/common/styles/layout.css";

export const container = style([
	pageContainer,
	{
		paddingTop: "40px",
		paddingBottom: "40px",
	},
]);

export const mainLayout = style({
	display: "flex",
	gap: "13px",
});

export const sidebarColumn = style({
	display: "flex",
	flexDirection: "column",
	gap: "16px",
	width: "236px",
	flexShrink: 0,
	position: "sticky",
	top: "24px",
	alignSelf: "flex-start",
});

export const content = style({
	flexGrow: 1,
});

export const grid = style({
	display: "grid",
	gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
	gap: "12px",
});

export const emptyMessage = style({
	...themeVars.fonts.b1_1,
	marginTop: "20px",
	color: colors.grayscale[500],
});
