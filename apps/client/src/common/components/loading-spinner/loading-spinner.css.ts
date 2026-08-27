import { colors } from "@repo/ui/foundations";
import { keyframes, style } from "@vanilla-extract/css";

const spinAnimation = keyframes({
	"0%": { transform: "rotate(0deg)" },
	"100%": { transform: "rotate(360deg)" },
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
