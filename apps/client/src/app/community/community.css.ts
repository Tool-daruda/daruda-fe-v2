import { style } from "@vanilla-extract/css";
import { pageContainer } from "@/common/styles/layout.css";

export const container = style([
	pageContainer,
	{
		paddingTop: "32px",
		paddingBottom: "100px",
	},
]);

export const mainLayout = style({
	display: "flex",
	alignItems: "flex-start",
	gap: "24px",
});

export const content = style({
	display: "flex",
	flexDirection: "column",
	gap: "24px",
	flexGrow: 1,
	minWidth: 0,
});
