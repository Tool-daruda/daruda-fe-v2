import { style } from "@vanilla-extract/css";

export const container = style({
	maxWidth: "768px",
	margin: "0 auto",
	padding: "40px 20px 100px",
	display: "flex",
	flexDirection: "column",
	gap: "42px",
});

export const topGroup = style({
	display: "flex",
	flexDirection: "column",
	gap: "20px",
	width: "100%",
});

export const actionsArea = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "28px",
	width: "100%",
});
