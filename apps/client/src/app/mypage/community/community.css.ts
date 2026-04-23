import { style } from "@vanilla-extract/css";

const primaryColor = "#5B58FF";

export const subTabContainer = style({
	display: "flex",
	gap: "12px",
	marginBottom: "24px",
});

export const subTab = style({
	padding: "8px 16px",
	borderRadius: "20px",
	fontSize: "14px",
	fontWeight: "500",
	textDecoration: "none",
	transition: "all 0.2s ease",
});

export const activeSubTab = style([
	subTab,
	{
		backgroundColor: "#EEF0FF",
		color: primaryColor,
		fontWeight: "bold",
	},
]);

export const inactiveSubTab = style([
	subTab,
	{
		color: "#888",
		backgroundColor: "transparent",
		":hover": {
			backgroundColor: "#F5F5F5",
		},
	},
]);

// 게시글 리스트 스타일
export const postList = style({
	display: "flex",
	flexDirection: "column",
});

export const postCard = style({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "flex-start",
	padding: "24px 0",
	borderBottom: "1px solid #F0F0F0",
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
	// 2줄 이상 넘어가면 말줄임표(...) 처리
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

// 우측 썸네일
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
