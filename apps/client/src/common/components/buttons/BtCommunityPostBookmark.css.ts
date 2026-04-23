import { typographyTokens } from "@repo/ui/foundations";
import { colorTokens } from "@repo/ui/foundations/tokens";
import { recipe } from "@vanilla-extract/recipes";
export const btCommunityPostBookmark = recipe({
	base: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		minWidth: "107px",
		minHeight: "48px",
		width: "fit-content",
		height: "fit-content",
		borderRadius: "200px",
		padding: "4px",
		gap: "10px",
		boxSizing: "border-box",
		border: "none",
		outline: "none",
		...typographyTokens.b2_1,
	},

	variants: {
		state: {
			//active
			active: {
				backgroundColor: colorTokens.brand.iris["500"],
				color: colorTokens.grayscale["0"],
			},
			//defult
			default: {
				backgroundColor: colorTokens.brand.iris["50"],
				color: colorTokens.brand.iris["500"],
			},
		},
	},
	defaultVariants: {
		state: "default",
	},
});
