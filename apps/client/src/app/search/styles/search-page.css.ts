import { colors, themeVars } from "@repo/ui/foundations";
import { keyframes, style } from "@vanilla-extract/css";

const spinAnimation = keyframes({
	"0%": { transform: "rotate(0deg)" },
	"100%": { transform: "rotate(360deg)" },
});

export const heroContainer = style({
	position: "relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	width: "100%",
	height: "220px",
	paddingTop: "40px",
	boxSizing: "border-box",
	textAlign: "center",
	backgroundColor: colors.grayscale[0],
	overflow: "hidden",
});

export const heroBackdrop = style({
	position: "absolute",
	top: "88.5px",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "771px",
	height: "135px",
	borderRadius: "50%",
	backgroundColor: colors.brand.iris[50],
	filter: "blur(40px)",
	pointerEvents: "none",
});

export const subTitle = style({
	...themeVars.fonts.b1_1,
	color: colors.brand.iris[400],
	marginBottom: "-2px",
	zIndex: 1,
});

export const title = style({
	...themeVars.fonts.h2_1,
	color: colors.brand.iris[500],
	marginBottom: "16px",
	zIndex: 1,
});

export const searchForm = style({
	display: "flex",
	alignItems: "center",
	gap: "8px",
	width: "442px",
	maxWidth: "100%",
	padding: "12px 24px",
	borderRadius: "60px",
	border: `1px solid ${colors.brand.iris[200]}`,
	backgroundColor: colors.grayscale[0],
	boxSizing: "border-box",
	zIndex: 1,
});

export const searchInput = style({
	flex: 1,
	minWidth: 0,
	border: "none",
	outline: "none",
	background: "transparent",
	padding: 0,
	...themeVars.fonts.caption1_1,
	color: colors.grayscale[900],
	selectors: {
		"&::placeholder": {
			color: colors.grayscale[300],
		},
	},
});

export const searchSubmitButton = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexShrink: 0,
	width: "20px",
	height: "20px",
	background: "none",
	border: "none",
	padding: 0,
	cursor: "pointer",
});

export const container = style({
	display: "flex",
	flexDirection: "column",
	gap: "16px",
	width: "100%",
	maxWidth: "804px",
	margin: "0 auto",
	paddingTop: "20px",
	paddingBottom: "100px",
	paddingLeft: "24px",
	paddingRight: "24px",
	boxSizing: "border-box",
});

export const resultSummary = style({
	display: "flex",
	alignItems: "center",
	gap: "2px",
	height: "28px",
	...themeVars.fonts.b4_1,
	color: colors.grayscale[500],
});

export const resultKeyword = style({
	maxWidth: "600px",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

export const contentArea = style({
	display: "flex",
	flexDirection: "column",
	gap: "40px",
	width: "100%",
});

export const sectionContainer = style({
	display: "flex",
	flexDirection: "column",
	width: "100%",
});

export const toolSection = style([sectionContainer, { gap: "16px" }]);

export const boardSection = style([sectionContainer, { gap: "20px" }]);

export const sectionHeader = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
	height: "24px",
});

export const sectionTitle = style({
	...themeVars.fonts.t2_1,
	color: colors.grayscale[700],
});

export const toolGrid = style({
	display: "grid",
	gridTemplateColumns: "repeat(auto-fit, 244px)",
	justifyContent: "center",
	gap: "10px",
	width: "100%",
});

export const boardList = style({
	display: "flex",
	flexDirection: "column",
	gap: "10px",
	width: "100%",
});

export const boardItemDivider = style({
	width: "100%",
	height: "1px",
	backgroundColor: colors.grayscale[50],
});

export const emptySection = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	gap: "32px",
	height: "200px",
	width: "100%",
	textAlign: "center",
});

export const emptyTextGroup = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "10px",
});

export const emptyTitle = style({
	...themeVars.fonts.t3_1,
	color: colors.grayscale[700],
});

export const emptyDescription = style({
	...themeVars.fonts.b4_2,
	color: colors.grayscale[300],
});

export const toolRequestButton = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "236px",
	padding: "14px 24px",
	borderRadius: "10px",
	backgroundColor: colors.grayscale[600],
	...themeVars.fonts.t4_1,
	color: colors.grayscale[0],
	textDecoration: "none",
	boxSizing: "border-box",
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
	animation: `${spinAnimation} 0.8s linear infinite`,
});
