import { typographyTokens } from "@repo/ui/foundations";
import { colorTokens } from "@repo/ui/foundations/tokens";
import { recipe } from "@vanilla-extract/recipes";
export const btCommunityCmtSummit = recipe({
	base: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "fit-content",
		height: "fit-content",
		minWidth: "61px",
		minHeight: "28px",
		padding: "6px 20px",
		borderRadius: "200px",
		gap: "10px",
		boxSizing: "border-box",
		border: "none",
		outline: "none",
		...typographyTokens.t5_2,
	},

	variants: {
		state: {
			default: {
				backgroundColor: colorTokens.grayscale["100"],
				color: colorTokens.grayscale["300"],
			},
			active: {
				backgroundColor: colorTokens.brand.iris["500"],
				color: colorTokens.grayscale["0"],
			},
		},
	},
	defaultVariants: {
		state: "default",
	},
});
