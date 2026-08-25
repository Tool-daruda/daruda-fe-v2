import { colors, themeVars } from "@repo/ui/foundations";
import { keyframes, style } from "@vanilla-extract/css";
import { pageContainer } from "@/common/styles/layout.css";

const spinAnimation = keyframes({
	"0%": { transform: "rotate(0deg)" },
	"100%": { transform: "rotate(360deg)" },
});

export const container = style([
	pageContainer,
	{
		paddingTop: "40px",
		paddingBottom: "40px",
	},
]);

export const mainLayout = style({
	display: "flex",
	gap: "40px",
});

export const content = style({
	flexGrow: 1,
});

export const grid = style({
	display: "grid",
	gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
	gap: "12px",
	marginTop: "20px",
});

export const emptyMessage = style({
	...themeVars.fonts.b1_1,
	marginTop: "20px",
	color: colors.grayscale[500],
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
