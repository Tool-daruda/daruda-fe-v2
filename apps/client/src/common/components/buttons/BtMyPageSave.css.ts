import { typographyTokens } from "@repo/ui/foundations";
import { colorTokens } from "@repo/ui/foundations/tokens";
import { recipe } from "@vanilla-extract/recipes";

export const btMyPageSave = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",

		width: "fit-content",
		height: "fit-content",

		// 피그마 수치에 맞춰 조정해 주세요
		minWidth: "131px",
		minHeight: "54px",

		// 상 우 하 좌 개별 패딩
		padding: "15px 50px",

		borderRadius: "12px",
		boxSizing: "border-box",
		border: "none",
		outline: "none",
		cursor: "pointer",
		transition: "background-color 0.2s ease, color 0.2s ease",

		...typographyTokens.t2_1,
	},

	variants: {
		state: {
			active: {
				backgroundColor: colorTokens.brand.iris["500"],
				color: colorTokens.grayscale["0"],
			},
			default: {
				backgroundColor: colorTokens.grayscale["100"], // 회색 배경
				color: colorTokens.grayscale["300"], // 회색 글씨
				cursor: "not-allowed", // 비활성화 느낌 추가
			},
		},
	},
	defaultVariants: {
		state: "active",
	},
});
