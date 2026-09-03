import { colors } from "@repo/ui/foundations";
import { keyframes, style } from "@vanilla-extract/css";

const shimmer = keyframes({
	"0%": { backgroundPosition: "200% 0" },
	"100%": { backgroundPosition: "-200% 0" },
});

export const skeleton = style({
	backgroundColor: colors.grayscale[25],
	backgroundImage: `linear-gradient(90deg, ${colors.grayscale[25]} 0%, ${colors.grayscale[30]} 50%, ${colors.grayscale[25]} 100%)`,
	backgroundSize: "200% 100%",
	animation: `${shimmer} 1.4s ease-in-out infinite`,
	flexShrink: 0,

	"@media": {
		"(prefers-reduced-motion: reduce)": {
			animation: "none",
		},
	},
});
