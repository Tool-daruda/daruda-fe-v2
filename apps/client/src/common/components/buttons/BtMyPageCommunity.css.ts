// BtMyPageCommunityButton.css.ts
import { typographyTokens } from "@repo/ui/foundations";
import { colorTokens } from "@repo/ui/foundations/tokens";
import { recipe } from "@vanilla-extract/recipes";

export const btMyPageCommunity = recipe({
	base: {
		display: "inline-flex", // 콘텐츠 크기에 맞춤 (Hug)
		alignItems: "center",
		justifyContent: "center",
		minWidth: "92px", // 최소 너비 설정 (디자인에 따라 조정 가능)
		minHeight: "32px", // 최소 높이 설정 (디자인에 따라 조정 가능)
		width: "fit-content", // 콘텐츠 크기에 맞춤
		height: "fit-content", // 콘텐츠 크기에 맞춤
		padding: "6px 20px", // 이미지 비율에 맞춘 예상 수치
		borderRadius: "200px", // Pill shape
		gap: "10px",
		boxSizing: "border-box",
		border: "none",
		outline: "none",

		transition: "background-color 0.2s ease, color 0.2s ease",

		...typographyTokens.b4_2,
	},

	variants: {
		state: {
			// 이미지의 가운데 상태 (약간 더 연한 톤)
			hover: {
				backgroundColor: colorTokens.brand.iris["50"], // 아주 연한 배경
				color: colorTokens.grayscale["300"], // 미디엄 그레이 텍스트
			},
			// 이미지의 왼쪽 상태 (선택됨)
			active: {
				// Iris 계열의 밝은 톤 (예상: Iris 100)
				backgroundColor: colorTokens.brand.iris["100"],
				// Iris 계열의 진한 톤 (예상: Iris 600)
				color: colorTokens.brand.iris["600"],
			},
			// 이미지의 오른쪽 상태 (흰색 배경)
			default: {
				backgroundColor: colorTokens.grayscale["0"], // 흰색 배경
				color: colorTokens.grayscale["400"], // 미디엄 그레이 텍스트
				// 필요시 얇은 보더 추가 (선택 사항)
				// border: `1px solid ${colorTokens.grayscale["100"]}`,
			},
		},
	},

	defaultVariants: {
		state: "default",
	},
});
