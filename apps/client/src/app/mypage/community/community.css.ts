import { colors, themeVars } from "@repo/ui/foundations";
import { keyframes, style } from "@vanilla-extract/css";

const spinAnimation = keyframes({
	"0%": { transform: "rotate(0deg)" },
	"100%": { transform: "rotate(360deg)" },
});

export const subTabContainer = style({
	display: "flex",
	gap: "24px",
	marginBottom: "20px",
});

export const subTab = style({
	width: "92px",
	height: "32px",
	borderRadius: "200px",
	textDecoration: "none",
	transition: "all 0.2s ease",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

export const activeSubTab = style([
	subTab,
	{
		background: colors.brand.iris[100],
		color: colors.brand.iris[500],
		...themeVars.fonts.h5_1,
	},
]);

export const inactiveSubTab = style([
	subTab,
	{
		color: colors.grayscale[300],
		backgroundColor: "transparent",
		...themeVars.fonts.b4_2,
	},
]);

export const postList = style({
	display: "flex",
	flexDirection: "column",
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
