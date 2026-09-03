import { style } from "@vanilla-extract/css";

// 각 섹션의 container(padding 32px / gap 20px)와 같은 리듬을 씁니다.
export const container = style({
	padding: "32px",
	display: "flex",
	flexDirection: "column",
	gap: "20px",
});

export const grid = style({
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
	gap: "10px",
});
