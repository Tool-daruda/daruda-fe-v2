import { themeVars } from "@repo/ui/foundations";
import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const DANGER_SURFACE = "#FFD5CE";

const fadeIn = keyframes({
	from: { opacity: 0, transform: "translateY(0.8rem)" },
	to: { opacity: 1, transform: "translateY(0)" },
});

export const dialog = style({
	margin: "auto",
	width: "492px",
	maxWidth: "calc(100vw - 32px)",
	padding: "32px 36px 28px",
	border: "none",
	borderRadius: "10px",
	backgroundColor: themeVars.colors.grayscale[0],
	animation: `${fadeIn} 180ms cubic-bezier(0.16, 1, 0.3, 1)`,
	selectors: {
		"&::backdrop": {
			backgroundColor: "rgba(22, 22, 22, 0.4)",
		},
	},
	"@media": {
		"(prefers-reduced-motion: reduce)": {
			animation: "none",
		},
	},
});

export const content = style({
	display: "flex",
	flexDirection: "column",
	gap: "28px",
});

export const header = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: "16px",
});

export const title = style({
	...themeVars.fonts.t2_1,
	color: themeVars.colors.grayscale[900],
	wordBreak: "keep-all",
});

export const closeButton = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexShrink: 0,
	width: "24px",
	height: "24px",
});

export const description = style({
	...themeVars.fonts.b4_2,
	color: themeVars.colors.grayscale[300],
	whiteSpace: "pre-line",
	wordBreak: "keep-all",
});

export const actions = style({
	display: "flex",
	justifyContent: "flex-end",
	gap: "16px",
	marginTop: "36px",
});

export const actionButton = recipe({
	base: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "2px",
		padding: "10px 18px",
		borderRadius: "8px",
		border: "1px solid transparent",
		whiteSpace: "nowrap",
		...themeVars.fonts.t4_1,
	},
	variants: {
		tone: {
			cancel: {
				backgroundColor: themeVars.colors.grayscale[0],
				borderColor: themeVars.colors.brand.iris[500],
				color: themeVars.colors.brand.iris[500],
			},
			primary: {
				backgroundColor: themeVars.colors.brand.iris[500],
				color: themeVars.colors.grayscale[0],
			},
			danger: {
				backgroundColor: DANGER_SURFACE,
				color: themeVars.colors.system.red.lt,
			},
		},
	},
	defaultVariants: {
		tone: "primary",
	},
});
