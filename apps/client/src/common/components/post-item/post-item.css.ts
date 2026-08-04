import { style } from "@vanilla-extract/css";

export const postCard = style({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "flex-start",
	padding: "24px 0",
	borderBottom: "1px solid #F0F0F0",
	cursor: "pointer",
});

export const postContent = style({
	flex: 1,
	paddingRight: "32px",
});

export const postHeader = style({
	display: "flex",
	alignItems: "center",
	gap: "12px",
	marginBottom: "12px",
	fontSize: "13px",
	color: "#888",
});

export const toolBadge = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
	backgroundColor: "#F8F9FA",
	padding: "4px 8px",
	borderRadius: "6px",
	color: "#333",
	fontWeight: "500",
});

export const toolIconPlaceholder = style({
	width: "16px",
	height: "16px",
	borderRadius: "4px",
	backgroundColor: "#EAEAEA",
	backgroundImage: `linear-gradient(45deg, #DFDFDF 25%, transparent 25%, transparent 75%, #DFDFDF 75%, #DFDFDF), linear-gradient(45deg, #DFDFDF 25%, transparent 25%, transparent 75%, #DFDFDF 75%, #DFDFDF)`,
	backgroundSize: "4px 4px",
	backgroundPosition: "0 0, 2px 2px",
});

export const postTitle = style({
	fontSize: "18px",
	fontWeight: "bold",
	color: "#111",
	marginBottom: "8px",
});

export const postBody = style({
	fontSize: "14px",
	color: "#666",
	lineHeight: "1.5",
	display: "-webkit-box",
	WebkitLineClamp: 2,
	WebkitBoxOrient: "vertical",
	overflow: "hidden",
	marginBottom: "16px",
});

export const postFooter = style({
	display: "flex",
	alignItems: "center",
	gap: "16px",
	fontSize: "13px",
	color: "#888",
});

export const iconText = style({
	display: "flex",
	alignItems: "center",
	gap: "4px",
});

export const thumbnailPlaceholder = style({
	width: "120px",
	height: "120px",
	borderRadius: "8px",
	flexShrink: 0,
	backgroundColor: "#F9F9F9",
	backgroundImage: `linear-gradient(45deg, #EBEBEB 25%, transparent 25%, transparent 75%, #EBEBEB 75%, #EBEBEB), linear-gradient(45deg, #EBEBEB 25%, transparent 25%, transparent 75%, #EBEBEB 75%, #EBEBEB)`,
	backgroundSize: "8px 8px",
	backgroundPosition: "0 0, 4px 4px",
});
