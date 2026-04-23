import { typographyTokens } from "@repo/ui/foundations";
import { colorTokens } from "@repo/ui/foundations/tokens";
import { recipe } from "@vanilla-extract/recipes";

export const btSignUp = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",

		width: "fit-content",
		height: "fit-content",

		// 가로로 긴 버튼이므로 최소 너비를 크게 잡습니다
		minWidth: "368px",
		minHeight: "54px",

		padding: "8px 14px",

		borderRadius: "10px",
		gap: "2px",
		boxSizing: "border-box",
		border: "none",
		outline: "none",
		cursor: "pointer",
		transition: "background-color 0.2s ease, color 0.2s ease",

		...typographyTokens.t3_1, // 큼직한 버튼이므로 폰트 사이즈 업
	},

	variants: {
		state: {
			default: {
				backgroundColor: colorTokens.grayscale["100"],
				color: colorTokens.grayscale["300"],
				cursor: "not-allowed",
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
