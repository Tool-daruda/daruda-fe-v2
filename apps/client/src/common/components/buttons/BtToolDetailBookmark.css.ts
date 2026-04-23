import { colorTokens } from "@repo/ui/foundations/tokens";
import { recipe } from "@vanilla-extract/recipes";

export const btToolDetailBookmark = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",

		// 유연한 크기 조절 원칙 적용
		width: "fit-content",
		height: "fit-content",

		// 예상 수치 36x36
		minWidth: "36px",
		minHeight: "36px",

		// 아이콘이 정중앙에 오도록 내부 여백 설정 (상, 우, 하, 좌)
		// 아이콘 크기에 따라 조정 필요 (예: 6px 6px 6px 6px)
		padding: "8px 12px",

		// 둥근 사각형
		borderRadius: "10px",

		boxSizing: "border-box",
		border: "none",
		outline: "none",
		cursor: "pointer",
		transition: "background-color 0.2s ease, color 0.2s ease",
	},

	variants: {
		state: {
			// 왼쪽: 기본 상태 (연한 배경)
			default: {
				backgroundColor: colorTokens.brand.iris["100"],
			},
			// 가운데: 호버 상태 (약간 진해진 배경)
			hover: {
				backgroundColor: colorTokens.brand.iris["200"],
			},
			// 오른쪽: 활성화(북마크 됨) 상태 (진한 채워진 아이콘)
			active: {
				backgroundColor: colorTokens.brand.iris["100"], // 배경은 default와 비슷해 보임
			},
		},
	},
	defaultVariants: {
		state: "default",
	},
});
