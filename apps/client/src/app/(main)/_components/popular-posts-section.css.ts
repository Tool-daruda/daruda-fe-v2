import { style } from "@vanilla-extract/css";

export const grid = style({
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
	columnGap: "16px",
	rowGap: "20px",
});
