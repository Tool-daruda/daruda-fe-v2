import { typographyTokens } from "@repo/ui/foundations";
import { colorTokens } from "@repo/ui/foundations/tokens";
import { recipe } from "@vanilla-extract/recipes";

const red = "#FFD5CE"; // 실제 에러/레드 토큰으로 변경하세요
export const btPopup = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",

		// 유연한 크기 조절 원칙
		width: "fit-content",
		height: "fit-content",

		// 예상 최소 크기 (필요시 피그마 수치로 변경)
		minWidth: "61px",
		minHeight: "40px",

		// 상 우 하 좌 개별 패딩
		padding: "10px 18px",

		borderRadius: "8px",
		boxSizing: "border-box",
		border: "none",
		outline: "none",
		cursor: "pointer",
		transition: "background-color 0.2s ease, color 0.2s ease, border 0.2s ease",

		...typographyTokens.t4_1,
	},

	variants: {
		variant: {
			// 상단: 파란색 배경
			primary: {
				backgroundColor: colorTokens.brand.iris["500"],
				color: colorTokens.grayscale["0"],
			},
			// 중단: 흰색 배경, 파란색 테두리
			outline: {
				backgroundColor: colorTokens.grayscale["0"],
				color: colorTokens.brand.iris["500"],
				border: `1px solid ${colorTokens.brand.iris["500"]}`,
			},
			// 하단: 연한 빨간색 배경 (위험 액션)
			danger: {
				backgroundColor: red, // 실제 에러/레드 토큰으로 변경하세요
				color: colorTokens.system.red.lt,
			},
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});
