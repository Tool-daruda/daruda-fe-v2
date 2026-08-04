import { style } from "@vanilla-extract/css";

export const section = style({
	padding: "40px 24px 0",
});

export const row = style({
	display: "grid",
	gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
	gap: "12px",
});
