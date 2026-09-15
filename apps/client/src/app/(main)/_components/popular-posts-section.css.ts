import { media } from "@repo/ui/foundations";
import { globalStyle, style } from "@vanilla-extract/css";
import { MAIN_COMMUNITY_CARD_HEIGHT } from "./main-community-card.css";

export const grid = style({
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
	columnGap: "16px",
	rowGap: "20px",

	"@media": {
		[media.belowMd]: {
			gridTemplateColumns: "1fr",
			rowGap: "12px",
		},
	},
});

// 디자인상 모바일은 3장이다. 서버가 뷰포트를 모르므로 조회 개수(6)는 데스크톱과 공유하고
// 4~6번째를 CSS로 숨긴다. 숨긴 카드의 썸네일은 loading="lazy"라 애초에 요청되지 않는다.
globalStyle(`${grid} > *:nth-child(n + 4)`, {
	"@media": {
		[media.belowMd]: { display: "none" },
	},
});

export const skeletonSlot = style({
	height: MAIN_COMMUNITY_CARD_HEIGHT.desktop,

	"@media": {
		[media.belowMd]: { height: MAIN_COMMUNITY_CARD_HEIGHT.mobile },
	},
});
