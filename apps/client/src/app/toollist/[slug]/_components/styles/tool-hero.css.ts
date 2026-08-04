import { style } from "@vanilla-extract/css";

export const container = style({
	display: "grid",
	gridTemplateColumns: "80px minmax(0, 1fr)",
	gap: "16px",
	alignItems: "flex-start",
	padding: "24px 0 16px",
});

export const thumbnail = style({
	position: "relative",
	width: "80px",
	height: "80px",
	borderRadius: "12px",
	overflow: "hidden",
	background: "#f3f4f6",
	flexShrink: 0,
});

export const thumbnailImage = style({
	objectFit: "cover",
});

export const info = style({
	minWidth: 0,
	paddingTop: "4px",
});

export const titleRow = style({
	display: "flex",
	alignItems: "baseline",
	gap: "8px",
	flexWrap: "wrap",
});

export const title = style({
	fontSize: "22px",
	fontWeight: 700,
	lineHeight: 1.3,
	flexShrink: 0,
});

export const subTitle = style({
	fontSize: "14px",
	fontWeight: 400,
	color: "#8a8a8a",
});

export const description = style({
	marginTop: "6px",
	fontSize: "14px",
	color: "#555",
	lineHeight: 1.6,
	display: "-webkit-box",
	WebkitLineClamp: 2,
	WebkitBoxOrient: "vertical",
	overflow: "hidden",
});

export const updatedAt = style({
	marginTop: "8px",
	fontSize: "13px",
	color: "#555",
	display: "flex",
	gap: "6px",
});

export const updatedAtLabel = style({
	fontWeight: 600,
	color: "#333",
});
