import { style } from "@vanilla-extract/css";

// 각 섹션의 container와 같은 값이어야 로딩 자리와 실제 콘텐츠가 어긋나지 않습니다.
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
