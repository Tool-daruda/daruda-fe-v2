import { style } from "@vanilla-extract/css";

export const section = style({
	padding: "40px 24px 0",
});

export const grid = style({
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
	columnGap: "40px",
});
