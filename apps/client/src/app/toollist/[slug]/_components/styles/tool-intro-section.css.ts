import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	padding: "0 24px",
});

export const title = style({
	...themeVars.fonts.t2_1,
	color: colors.grayscale[900],
});

export const description = style({
	marginTop: "12px",
	...themeVars.fonts.caption2_1,
	color: colors.grayscale[700],
});

export const imageGrid = style({
	display: "flex",
	gap: "14px",
	overflowX: "auto",
	scrollSnapType: "x mandatory",
});

export const imageCard = style({
	position: "relative",
	// 데스크탑에서 2장이 보이던 기존 비율을 유지합니다. gap의 절반씩 나눠 뺍니다.
	flex: "0 0 calc(50% - 7px)",
	aspectRatio: "43/24",
	borderRadius: "12px",
	overflow: "hidden",
	background: "#f3f4f6",
	scrollSnapAlign: "start",

	"@media": {
		// 좁은 화면에서는 다음 장이 살짝 보이게 해 스크롤 가능함을 드러냅니다.
		"screen and (max-width: 768px)": {
			flex: "0 0 85%",
		},
	},
});

export const image = style({
	objectFit: "cover",
});
