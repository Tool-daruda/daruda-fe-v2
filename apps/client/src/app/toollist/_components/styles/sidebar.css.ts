import { style } from "@vanilla-extract/css";

export const sidebarContainer = style({
	width: "236px",
	backgroundColor: "#fff",
	borderRadius: "24px",
	padding: "32px 24px",
	border: "1px solid #F3F4F6",
	display: "flex",
	flexDirection: "column",
	gap: "24px",
});

export const title = style({
	fontSize: "22px",
	fontWeight: "800",
	color: "#111",
	margin: 0,
});

export const list = style({
	display: "flex",
	flexDirection: "column",
	gap: "8px",
});

export const categoryItem = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "12px 8px",
	cursor: "pointer",
	fontSize: "18px",
	fontWeight: "500",
	color: "#4B5563",
	transition: "all 0.2s ease",
	selectors: {
		"&.active": {
			color: "#5C5CFF",
			fontWeight: "700",
		},
	},
});

export const radioCircle = style({
	width: "20px",
	height: "20px",
	borderRadius: "50%",
	border: "2px solid #E5E7EB",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	transition: "all 0.2s ease",
	selectors: {
		[`${categoryItem}.active &`]: {
			borderColor: "#5C5CFF",
		},
	},
});

export const radioInner = style({
	width: "10px",
	height: "10px",
	borderRadius: "50%",
	backgroundColor: "#5C5CFF",
	display: "none",
	selectors: {
		[`${categoryItem}.active &`]: {
			display: "block",
		},
	},
});
