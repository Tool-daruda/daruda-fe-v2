import { colorTokens } from "@repo/ui/foundations/tokens";
import { recipe } from "@vanilla-extract/recipes";

export const btToolDetailFeedback = recipe({
	base: {
		display: "inline-flex",
		flexDirection: "column", // 텍스트와 숫자를 위아래로 배치
		alignItems: "center",
		justifyContent: "center",
		width: "fit-content", // 콘텐츠 크기에 맞춤
		height: "fit-content", // 콘텐츠 크기에 맞춤
		minWidth: "156px", // 최소 너비 설정 (디자인에 따라 조정 가능)
		minHeight: "66px", // 최소 높이 설정 (디자인에 따라 조정 가능)
		padding: "14px 22px 10px 22px", // 상하 12px, 좌우 24px (비율 추정)
		borderRadius: "20px", // 둥근 사각형 형태
		gap: "6px", // "도움이 되었어요"와 숫자 "1" 사이의 간격
		boxSizing: "border-box",
		border: "none",
		outline: "none",
		cursor: "pointer",
		transition: "background-color 0.2s ease, color 0.2s ease",
	},

	variants: {
		state: {
			// 왼쪽: 기본 상태 (가장 연한 블루/퍼플 배경)
			default: {
				backgroundColor: colorTokens.brand.iris["100"],
				color: colorTokens.brand.iris["500"], // 글씨와 하트 아이콘 색상
			},
			// 가운데: 호버 상태 (기본보다 살짝 더 진한 블루/퍼플 배경)
			hover: {
				backgroundColor: colorTokens.brand.iris["200"],
				color: colorTokens.brand.iris["500"],
			},
			// 오른쪽: 활성화 상태 (진한 블루 배경, 흰색 글씨)
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
