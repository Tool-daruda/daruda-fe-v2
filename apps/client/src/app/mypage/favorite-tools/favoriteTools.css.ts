import { style, styleVariants } from "@vanilla-extract/css";

export const gridContainer = style({
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	gap: "24px",
	paddingTop: "10px",
});

// TOOD: 공컴으로 변경
export const card = style({
	border: "1px solid #F0F0F0",
	borderRadius: "16px",
	padding: "20px",
	display: "flex",
	flexDirection: "column",
	gap: "16px",
	backgroundColor: "#FFFFFF",
});

export const cardTop = style({
	display: "flex",
	gap: "14px",
	alignItems: "flex-start",
});

export const imagePlaceholder = style({
	width: "64px",
	height: "64px",
	borderRadius: "12px",
	flexShrink: 0,
	backgroundColor: "#F9F9F9",
	backgroundImage: `
    linear-gradient(45deg, #EBEBEB 25%, transparent 25%, transparent 75%, #EBEBEB 75%, #EBEBEB), 
    linear-gradient(45deg, #EBEBEB 25%, transparent 25%, transparent 75%, #EBEBEB 75%, #EBEBEB)
  `,
	backgroundSize: "8px 8px",
	backgroundPosition: "0 0, 4px 4px",
});

export const textContainer = style({
	flex: 1,
	overflow: "hidden",
	paddingTop: "2px",
});

export const cardTitle = style({
	fontSize: "16px",
	fontWeight: "bold",
	color: "#333",
	marginBottom: "6px",
	lineHeight: "1.4",
	whiteSpace: "pre-line",
});

export const cardDescription = style({
	fontSize: "13px",
	color: "#888",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
});

export const bookmarkIcon = style({
	color: "#5B58FF",
	cursor: "pointer",
	flexShrink: 0,
});

export const tagContainer = style({
	display: "flex",
	gap: "8px",
	flexWrap: "wrap",
});

export const baseTag = style({
	padding: "6px 10px",
	borderRadius: "6px",
	fontSize: "12px",
	fontWeight: "600",
});

export const defaultTag = style([
	baseTag,
	{
		backgroundColor: "#F5F5F5",
		color: "#777",
	},
]);

export const priceTag = styleVariants({
	paid: [baseTag, { backgroundColor: "#EEF0FF", color: "#5B58FF" }],
	free: [baseTag, { backgroundColor: "#FFF4E5", color: "#FF9800" }],
	freemium: [baseTag, { backgroundColor: "#E5F0FF", color: "#5B58FF" }],
});
