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
