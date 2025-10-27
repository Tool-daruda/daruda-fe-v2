import { recipe } from "@vanilla-extract/recipes";
import { buttonColors, buttonSizes } from "./button.constants";

export const buttonRecipe = recipe({
	base: {
		padding: "8px 14px",
		borderRadius: "12px",
		cursor: "pointer",
		border: "1px solid transparent",
		boxSizing: "border-box",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		whiteSpace: "nowrap",
	},

	variants: {
		intent: {
			primary: {},
			dangerous: {},
			tonal: {},
		},
		appearance: {
			filled: {},
			outlined: {},
		},
		size: {
			lg: {
				width: buttonSizes.lg.width,
				height: buttonSizes.lg.height,
				...buttonSizes.lg.fonts,
			},
			sm: { ...buttonSizes.sm.fonts },
			icon: {
				width: "44px",
				height: "44px",
				padding: "0",
			},
		},
		rounded: {
			rounded: {},
			pill: {
				borderRadius: "9999px",
			},
		},
	},

	compoundVariants: [
		// Primary
		{
			variants: { intent: "primary", appearance: "filled" },
			style: {
				backgroundColor: buttonColors.primary.filled.backgroundColor,
				color: buttonColors.primary.filled.color,
			},
		},
		{
			variants: { intent: "primary", appearance: "outlined" },
			style: {
				background: buttonColors.primary.outlined.backgroundColor,
				color: buttonColors.primary.outlined.color,
				borderColor: buttonColors.primary.outlined.color,
			},
		},

		// Dangerous
		{
			variants: { intent: "dangerous", appearance: "filled" },
			style: {
				backgroundColor: buttonColors.dangerous.filled.backgroundColor,
				color: buttonColors.dangerous.filled.color,
			},
		},
		{
			variants: { intent: "dangerous", appearance: "outlined" },
			style: {
				backgroundColor: buttonColors.dangerous.outlined.backgroundColor,
				color: buttonColors.dangerous.outlined.color,
				borderColor: buttonColors.dangerous.outlined.color,
			},
		},

		// Tonal
		{
			variants: { intent: "tonal" },
			style: {
				backgroundColor: buttonColors.tonal.filled.backgroundColor,
				color: buttonColors.tonal.filled.color,
			},
		},
	],

	defaultVariants: {
		intent: "primary",
		appearance: "filled",
		size: "lg",
		rounded: "rounded",
	},
});
