import { style } from "@vanilla-extract/css";
import { pageContainer } from "@/common/styles/layout.css";

export const page = style({
	display: "flex",
	flexDirection: "column",
	paddingBottom: "100px",
});

export const content = style([
	pageContainer,
	{
		display: "flex",
		flexDirection: "column",
		gap: "36px",
		paddingTop: "36px",
	},
]);

export const sections = style({
	display: "flex",
	flexDirection: "column",
	gap: "52px",
});
