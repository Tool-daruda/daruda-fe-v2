import { colors, themeVars } from "@repo/ui/foundations";
import { composeStyles, style } from "@vanilla-extract/css";

export const container = style({
	padding: "0 24px",
	display: "flex",
	flexDirection: "column",
	gap: "20px",
});

export const title = style({
	...themeVars.fonts.t3_1,
	color: colors.grayscale[900],
});

export const grid = style({
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
	gap: "16px",

	"@media": {
		"screen and (max-width: 768px)": {
			gridTemplateColumns: "1fr",
		},
	},
});

export const card = style({
	position: "relative",
	aspectRatio: "16 / 9",
	borderRadius: "18px",
	overflow: "hidden",
	background: colors.grayscale[25],
});

export const image = style({
	objectFit: "cover",
});

export const dim = style({
	position: "absolute",
	inset: 0,
	backgroundColor: "rgba(22, 22, 22, 0.4)",
	opacity: 0,
	transition: "opacity 0.2s ease",

	selectors: {
		[`${card}:hover &`]: {
			opacity: 1,
		},
	},
});

const playIconBase = style({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
});

export const playIcon = composeStyles(
	playIconBase,
	style({
		opacity: 0,
		transition: "opacity 0.2s ease",

		selectors: {
			[`${card}:hover &`]: {
				opacity: 1,
			},
		},
	})
);

// 썸네일이 없는 카드는 빈 회색 박스가 되므로 재생 아이콘을 계속 띄워 링크임을 보여준다
export const fallbackPlayIcon = composeStyles(
	playIconBase,
	style({
		opacity: 0.4,
	})
);
