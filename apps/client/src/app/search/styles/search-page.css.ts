import { style } from "@vanilla-extract/css";

export const container = style({
	maxWidth: "1200px",
	margin: "0 auto",
	padding: "40px 20px 100px",
});

export const headerSection = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	marginBottom: "32px",
});

export const title = style({
	fontSize: "28px",
	fontWeight: 700,
	color: "#161616",
	marginBottom: "8px",
});

export const subTitle = style({
	fontSize: "16px",
	color: "#656565",
	marginBottom: "24px",
});

export const searchForm = style({
	position: "relative",
	width: "100%",
	maxWidth: "600px",
	display: "flex",
	alignItems: "center",
});

export const searchInput = style({
	width: "100%",
	height: "56px",
	padding: "0 54px 0 20px",
	borderRadius: "16px",
	border: "1.5px solid #EBEBEB",
	backgroundColor: "#FFFFFF",
	fontSize: "16px",
	color: "#161616",
	outline: "none",
	transition: "border-color 0.2s ease, box-shadow 0.2s ease",
	selectors: {
		"&:focus": {
			borderColor: "#5254F0",
			boxShadow: "0 0 0 3px rgba(82, 84, 240, 0.1)",
		},
		"&::placeholder": {
			color: "#989898",
		},
	},
});

export const searchSubmitButton = style({
	position: "absolute",
	right: "16px",
	background: "none",
	border: "none",
	cursor: "pointer",
	padding: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

export const tabContainer = style({
	display: "flex",
	borderBottom: "1px solid #EBEBEB",
	marginBottom: "32px",
	gap: "24px",
});

export const tabButton = style({
	position: "relative",
	padding: "12px 4px 16px",
	fontSize: "18px",
	fontWeight: 600,
	color: "#7C7C7C",
	background: "none",
	border: "none",
	cursor: "pointer",
	transition: "color 0.2s ease",
	selectors: {
		"&[data-active='true']": {
			color: "#5254F0",
			fontWeight: 700,
		},
		"&:hover": {
			color: "#5254F0",
		},
	},
});

export const activeIndicator = style({
	position: "absolute",
	bottom: "-1px",
	left: 0,
	right: 0,
	height: "3px",
	backgroundColor: "#5254F0",
	borderRadius: "3px 3px 0 0",
});

export const resultCount = style({
	fontSize: "14px",
	fontWeight: 500,
	color: "#7C7C7C",
	marginLeft: "6px",
});

export const contentArea = style({
	width: "100%",
});

export const toolGrid = style({
	display: "grid",
	gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
	gap: "16px",
	"@media": {
		"screen and (max-width: 960px)": {
			gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
		},
		"screen and (max-width: 640px)": {
			gridTemplateColumns: "1fr",
		},
	},
});

export const boardList = style({
	display: "flex",
	flexDirection: "column",
});

export const boardItemDivider = style({
	height: "1px",
	backgroundColor: "#EBEBEB",
	margin: "16px 0",
});

export const emptyState = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	padding: "80px 0",
	textAlign: "center",
	color: "#7C7C7C",
});

export const emptyIcon = style({
	marginBottom: "16px",
	opacity: 0.6,
});

export const emptyTitle = style({
	fontSize: "18px",
	fontWeight: 600,
	color: "#3D3D3D",
	marginBottom: "8px",
});

export const emptyDescription = style({
	fontSize: "14px",
	color: "#989898",
});

export const loadingTrigger = style({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	padding: "32px 0",
});

export const spinner = style({
	width: "28px",
	height: "28px",
	border: "3px solid #E0E7FF",
	borderTopColor: "#5254F0",
	borderRadius: "50%",
	animation: "spin 0.8s linear infinite",
});
