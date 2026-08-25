import { colors, themeVars } from "@repo/ui/foundations";
import { keyframes, style } from "@vanilla-extract/css";
import { pageContainer } from "@/common/styles/layout.css";

const spinAnimation = keyframes({
	"0%": { transform: "rotate(0deg)" },
	"100%": { transform: "rotate(360deg)" },
});

export const heroContainer = style({
	position: "relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	paddingTop: "48px",
	paddingBottom: "56px",
	textAlign: "center",
	background: "linear-gradient(180deg, #F8F9FF 0%, #FFFFFF 100%)",
	overflow: "hidden",
});

export const blurShape1 = style({
	position: "absolute",
	width: "360px",
	height: "360px",
	borderRadius: "50%",
	background: "radial-gradient(circle, rgba(129, 139, 248, 0.35) 0%, rgba(238, 242, 255, 0) 70%)",
	filter: "blur(50px)",
	top: "-80px",
	right: "15%",
	pointerEvents: "none",
});

export const blurShape2 = style({
	position: "absolute",
	width: "320px",
	height: "320px",
	borderRadius: "50%",
	background: "radial-gradient(circle, rgba(199, 210, 254, 0.45) 0%, rgba(238, 242, 255, 0) 70%)",
	filter: "blur(45px)",
	bottom: "-60px",
	left: "10%",
	pointerEvents: "none",
});

export const blurShape3 = style({
	position: "absolute",
	width: "280px",
	height: "280px",
	borderRadius: "50%",
	background: "radial-gradient(circle, rgba(255, 184, 108, 0.3) 0%, rgba(255, 247, 237, 0) 70%)",
	filter: "blur(55px)",
	top: "10%",
	left: "30%",
	pointerEvents: "none",
});

export const subTitle = style({
	...themeVars.fonts.b1_1,
	color: colors.brand.iris[400],
	zIndex: 1,
	marginBottom: "4px",
});

export const title = style({
	...themeVars.fonts.h2_1,
	color: colors.brand.iris[500],
	marginBottom: "28px",
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
	border: `1.5px solid ${colors.brand.iris[200]}`,
	...themeVars.fonts.b4_2,
	backgroundColor: colors.grayscale[0],
	outline: "none",
	boxShadow: "0px 4px 20px rgba(82, 84, 240, 0.06)",
	transition: "border-color 0.2s ease, box-shadow 0.2s ease",
	selectors: {
		"&:focus": {
			borderColor: colors.brand.iris[500],
			boxShadow: "0 0 0 3px rgba(82, 84, 240, 0.15)",
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

export const container = style([
	pageContainer,
	{
		paddingTop: "48px",
		paddingBottom: "100px",
	},
]);

export const contentArea = style({
	width: "100%",
});

export const sectionContainer = style({
	marginBottom: "56px",
});

export const sectionHeader = style({
	display: "flex",
	alignItems: "center",
	gap: "8px",
	marginBottom: "20px",
});

export const sectionTitle = style({
	...themeVars.fonts.t1_1,
	color: colors.grayscale[900],
	fontWeight: 700,
});

export const sectionCountChip = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "2px 8px",
	borderRadius: "12px",
	backgroundColor: colors.brand.iris[50],
	color: colors.brand.iris[500],
	...themeVars.fonts.b5_1,
	fontWeight: 600,
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

export const emptySection = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	padding: "48px 0",
	backgroundColor: colors.grayscale[5],
	borderRadius: "16px",
	textAlign: "center",
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
	animation: `${spinAnimation} 0.8s linear infinite`,
});
