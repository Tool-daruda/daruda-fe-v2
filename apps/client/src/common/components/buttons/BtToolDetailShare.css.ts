import { colorTokens } from "@repo/ui/foundations/tokens";
import { recipe } from "@vanilla-extract/recipes";

export const btToolDetailShare = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",

		width: "fit-content",
		height: "fit-content",

		minWidth: "36px",
		minHeight: "36px",

		padding: "8px 12px",

		borderRadius: "10px",
		boxSizing: "border-box",
		border: "none",
		outline: "none",
		cursor: "pointer",
		transition: "background-color 0.2s ease, color 0.2s ease",
	},

	variants: {
		state: {
			default: {
				backgroundColor: colorTokens.brand.iris["100"],
				color: colorTokens.brand.iris["400"],
			},
			hover: {
				backgroundColor: colorTokens.brand.iris["200"],
				color: colorTokens.brand.iris["500"],
			},
		},
	},
	defaultVariants: {
		state: "default",
	},
});
