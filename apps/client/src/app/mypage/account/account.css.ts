import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	paddingTop: "60px",
});

export const title = style({
	color: colors.grayscale[900],
	...themeVars.fonts.t1_1,
	marginBottom: "50px",
});

export const warningList = style({
	listStyleType: "disc",
	paddingLeft: "20px",
	color: themeVars.colors.grayscale[600],
	...themeVars.fonts.b4_1,
	marginBottom: "90px",
	wordBreak: "keep-all",
});

/** 토큰에 없는 값이라 디자인 값을 그대로 쓴다. (system_red_lt의 연한 배경) */
const DANGER_SURFACE = "#FFD5CE";

export const withdrawButton = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "15px 38px",
	borderRadius: "12px",
	backgroundColor: DANGER_SURFACE,
	color: themeVars.colors.system.red.lt,
	whiteSpace: "nowrap",
	// Figma의 Body/B3_2. 공용 타이포 토큰에는 없는 조합이라 값을 직접 적는다.
	fontFamily: "Pretendard",
	fontWeight: 500,
	fontSize: "16px",
	lineHeight: "24px",
	letterSpacing: "-0.192px",
	selectors: {
		"&:disabled": {
			opacity: 0.5,
			cursor: "not-allowed",
		},
	},
});
