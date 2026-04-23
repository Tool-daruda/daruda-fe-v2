import { typographyTokens } from "@repo/ui/foundations";
import { colorTokens } from "@repo/ui/foundations/tokens";
import { recipe } from "@vanilla-extract/recipes";

export const btChipMainCategory = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		minWidth: "41px", // 파일명의 64를 반영한 고정 너비 또는 minWidth
		minHeight: "28px", // 파일명의 28을 반영한 고정 높이 또는 minHeight
		width: "fit-content", // 콘텐츠 크기에 맞춤
		height: "fit-content", // 콘텐츠 크기에 맞춤
		padding: "4px 10px", // 높이에 맞춘 좌우 패딩
		borderRadius: "39px", // 완전한 둥근 형태 (Pill shape)
		gap: "10px", // 아이콘과 텍스트 사이의 간격 (필요시 조정)
		boxSizing: "border-box",
		border: "none",
		outline: "none",
		cursor: "pointer",
		transition: "background-color 0.2s ease, color 0.2s ease",

		// 칩에 어울리는 약간 작은 폰트 토큰 적용 (필요시 디자인 시스템에 맞게 수정)
		...typographyTokens.caption2_1,
	},

	variants: {
		state: {
			// 왼쪽: 기본 상태 (흰색 배경, 회색 글씨)
			default: {
				backgroundColor: colorTokens.grayscale["0"],
				color: colorTokens.grayscale["300"],
				// 💡 팁: 만약 마우스를 올렸을 때 hover 상태로 자동 전환되길 원하신다면 아래 코드를 주석 해제하세요.
				// ":hover": {
				//     backgroundColor: colorTokens.brand.iris["50"],
				// },
			},
			// 가운데: 호버 상태 (연한 블루/퍼플 배경, 회색 글씨)
			hover: {
				backgroundColor: colorTokens.brand.iris["100"], // 연한 톤 (수치 조정 필요 가능성 있음)
				color: colorTokens.grayscale["400"],
			},
			// 오른쪽: 활성화(선택) 상태 (진한 블루/퍼플 배경, 흰색 글씨)
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
