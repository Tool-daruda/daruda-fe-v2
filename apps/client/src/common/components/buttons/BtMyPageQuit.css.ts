import { typographyTokens } from "@repo/ui/foundations";
import { colorTokens } from "@repo/ui/foundations/tokens";
import { recipe } from "@vanilla-extract/recipes";

const red = "#FFD5CE"; // 실제 에러/레드 토큰으로 변경하세요
export const btMyPageQuit = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",

		width: "fit-content",
		height: "fit-content",

		// 팝업 버튼보다 약간 더 큰 최소 사이즈 적용
		minWidth: "131px",
		minHeight: "54px",

		// 상 우 하 좌 개별 패딩
		padding: "15px 38px",

		borderRadius: "12px",
		boxSizing: "border-box",
		border: "none",
		outline: "none",
		cursor: "pointer",
		transition: "background-color 0.2s ease, color 0.2s ease",

		// 탈퇴하기 버튼이므로 조금 더 강조된 폰트 사용
		...typographyTokens.b3_1,
	},

	variants: {
		state: {
			default: {
				backgroundColor: red, // 실제 토큰으로 변경
				color: colorTokens.system.red.lt,
			},
		},
	},
	defaultVariants: {
		state: "default",
	},
});
