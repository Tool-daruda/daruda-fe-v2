import { themeVars } from "@repo/ui/foundations";
import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

/** 퇴장 애니메이션 길이(ms). 스토어가 토스트를 제거하는 시점과 맞춘다. */
export const TOAST_EXIT_DURATION = 200;

const TOAST_ENTER_DURATION = 220;

const slideIn = keyframes({
	from: { opacity: 0, transform: "translateY(1.2rem)" },
	to: { opacity: 1, transform: "translateY(0)" },
});

const fadeOut = keyframes({
	from: { opacity: 1, transform: "translateY(0)" },
	to: { opacity: 0, transform: "translateY(0.4rem)" },
});

export const viewport = style({
	position: "fixed",
	left: "3.2rem",
	bottom: "3.2rem",
	zIndex: 9999,
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	gap: "0.8rem",
	pointerEvents: "none",
});

export const toast = recipe({
	base: {
		display: "inline-flex",
		padding: "1.2rem 2rem",
		justifyContent: "center",
		alignItems: "center",
		gap: "1rem",
		borderRadius: "1rem",
		background: "rgba(22, 22, 22, 0.4)",
		backdropFilter: "blur(0.8rem)",
		WebkitBackdropFilter: "blur(0.8rem)",
		boxSizing: "border-box",
		maxWidth: "calc(100vw - 6.4rem)",
		animationFillMode: "both",
		"@media": {
			"(prefers-reduced-motion: reduce)": {
				animation: "none",
			},
		},
	},
	variants: {
		status: {
			visible: {
				animationName: slideIn,
				animationDuration: `${TOAST_ENTER_DURATION}ms`,
				animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
			},
			leaving: {
				animationName: fadeOut,
				animationDuration: `${TOAST_EXIT_DURATION}ms`,
				animationTimingFunction: "ease-in",
			},
		},
	},
	defaultVariants: {
		status: "visible",
	},
});

export const message = style({
	...themeVars.fonts.b4_2,
	color: themeVars.colors.grayscale[0],
	wordBreak: "keep-all",
});
