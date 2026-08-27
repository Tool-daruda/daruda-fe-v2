import { style } from "@vanilla-extract/css";

export const row = style({
	display: "grid",
	gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
	gap: "16px",
});
