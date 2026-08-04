import { style } from "@vanilla-extract/css";

export const container = style({
	maxWidth: "1200px",
	margin: "0 auto",
	padding: "32px 20px 100px",
});

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
