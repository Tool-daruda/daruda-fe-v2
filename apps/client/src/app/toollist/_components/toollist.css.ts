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

export const sidebar = style({
	width: "240px",
	flexShrink: 0,
});

export const content = style({
	flexGrow: 1,
});

export const grid = style({
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	gap: "24px",
	marginTop: "20px",
});

export const categoryItem = style({
	padding: "12px 16px",
	cursor: "pointer",
	borderRadius: "8px",
	selectors: {
		"&:hover": { backgroundColor: "#f3f4f6" },
		"&.active": { color: "#5C5CFF", fontWeight: "bold" },
	},
});
