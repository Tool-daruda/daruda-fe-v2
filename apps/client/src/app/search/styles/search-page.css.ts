import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const heroContainer = style({
	position: "relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	paddingTop: "40px",
	paddingBottom: "48px",
	textAlign: "center",
	background: colors.brand.iris[50],
	overflow: "hidden",
});

export const decorativeImage = style({
	position: "absolute",
	right: "120px",
	bottom: 0,
	pointerEvents: "none",
	"@media": {
		"screen and (max-width: 960px)": {
			display: "none",
		},
	},
});

export const subTitle = style({
	...themeVars.fonts.b1_1,
	color: colors.brand.iris[400],
	zIndex: 1,
});

export const title = style({
	...themeVars.fonts.h2_1,
	color: colors.brand.iris[500],
	marginBottom: "24px",
	zIndex: 1,
});

export const searchForm = style({
	position: "relative",
	width: "100%",
	maxWidth: "560px",
	zIndex: 1,
});

export const searchInput = style({
	width: "100%",
	padding: "14px 56px 14px 24px",
	borderRadius: "60px",
	boxSizing: "border-box",
	border: `1px solid ${colors.brand.iris[200]}`,
	...themeVars.fonts.b4_2,
	backgroundColor: colors.grayscale[0],
	outline: "none",
	transition: "border-color 0.2s ease, box-shadow 0.2s ease",
	selectors: {
		"&:focus": {
			borderColor: colors.brand.iris[500],
			boxShadow: "0 0 0 3px rgba(82, 84, 240, 0.12)",
		},
		"&::placeholder": {
			color: colors.grayscale[300],
		},
	},
});

export const searchSubmitButton = style({
	position: "absolute",
	right: "20px",
	top: "50%",
	transform: "translateY(-50%)",
	background: "none",
	border: "none",
	cursor: "pointer",
	padding: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

export const container = style({
	maxWidth: "1200px",
	margin: "0 auto",
	padding: "40px 20px 100px",
});

export const tabContainer = style({
	display: "flex",
	borderBottom: `1px solid ${colors.grayscale[50]}`,
	marginBottom: "32px",
	gap: "32px",
});

export const tabButton = style({
	position: "relative",
	padding: "12px 0 16px",
	...themeVars.fonts.t2_1,
	color: colors.grayscale[400],
	background: "none",
	border: "none",
	cursor: "pointer",
	transition: "color 0.2s ease",
	selectors: {
		"&[data-active='true']": {
			color: colors.brand.iris[500],
			fontWeight: 700,
		},
		"&:hover": {
			color: colors.brand.iris[500],
		},
	},
});

export const activeIndicator = style({
	position: "absolute",
	bottom: "-1px",
	left: 0,
	right: 0,
	height: "3px",
	backgroundColor: colors.brand.iris[500],
	borderRadius: "3px 3px 0 0",
});

export const resultCount = style({
	...themeVars.fonts.b4_1,
	color: colors.grayscale[300],
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
	backgroundColor: colors.grayscale[50],
	margin: "16px 0",
});

export const emptyState = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	padding: "100px 0",
	textAlign: "center",
});

export const emptyIcon = style({
	marginBottom: "16px",
	opacity: 0.6,
});

export const emptyTitle = style({
	...themeVars.fonts.t2_1,
	color: colors.grayscale[700],
	marginBottom: "8px",
});

export const emptyDescription = style({
	...themeVars.fonts.b4_2,
	color: colors.grayscale[400],
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
	border: `3px solid ${colors.brand.iris[100]}`,
	borderTopColor: colors.brand.iris[500],
	borderRadius: "50%",
	animation: "spin 0.8s linear infinite",
});
