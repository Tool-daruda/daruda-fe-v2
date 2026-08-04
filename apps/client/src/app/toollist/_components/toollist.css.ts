import { style } from "@vanilla-extract/css";

export const container = style({
	maxWidth: "1200px",
	margin: "0 auto",
	padding: "40px 20px",
});

export const mainLayout = style({
	display: "flex",
	gap: "40px",
});

export const content = style({
	flexGrow: 1,
});

export const grid = style({
	display: "grid",
	gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
	gap: "12px",
	marginTop: "20px",
});
