import { colors, media } from "@repo/ui/foundations";
import { globalStyle, style } from "@vanilla-extract/css";
import { CONTENT_SIDE_PADDING_MOBILE, pageContainer } from "@/common/styles/layout.css";

export const page = style({
	display: "flex",
	flexDirection: "column",
	paddingBottom: "100px",

	"@media": {
		[media.belowMd]: {
			// 모바일에선 마지막 섹션 다음에 바로 푸터가 붙는다.
			paddingBottom: "0",
		},
	},
});

export const content = style([
	pageContainer,
	{
		display: "flex",
		flexDirection: "column",
		gap: "36px",
		paddingTop: "36px",

		"@media": {
			[media.belowMd]: {
				// 배너가 헤더에 바로 붙고, 각 섹션이 자기 세로 패딩을 갖는다.
				paddingTop: "0",
				gap: "0",
			},
		},
	},
]);

export const sections = style({
	display: "flex",
	flexDirection: "column",
	gap: "52px",

	"@media": {
		[media.belowMd]: {
			gap: "0",
		},
	},
});

// 모바일에서 각 섹션은 자기 세로 패딩을 갖고 content의 좌우 패딩을 뚫고 나가 배경을 채운다.
// 섹션 컴포넌트는 데이터가 없으면 null을 반환할 수 있지만, 실제로 비는 건 API 장애 상황뿐이라
// 이 nth-child 기반 교차 배경은 그 케이스를 감안해 구조를 바꾸지 않는다.
globalStyle(`${sections} > section`, {
	"@media": {
		[media.belowMd]: {
			paddingTop: "32px",
			paddingBottom: "32px",
			marginLeft: `calc(-1 * (${CONTENT_SIDE_PADDING_MOBILE} + env(safe-area-inset-left)))`,
			marginRight: `calc(-1 * (${CONTENT_SIDE_PADDING_MOBILE} + env(safe-area-inset-right)))`,
			paddingLeft: `calc(${CONTENT_SIDE_PADDING_MOBILE} + env(safe-area-inset-left))`,
			paddingRight: `calc(${CONTENT_SIDE_PADDING_MOBILE} + env(safe-area-inset-right))`,
		},
	},
});

// 무료 툴 / 신규 툴 섹션만 회색 배경이다(디자인 #FAFAFA → 토큰 grayscale[25] #F8F8F8로 근사).
globalStyle(`${sections} > section:nth-child(even)`, {
	"@media": {
		[media.belowMd]: {
			backgroundColor: colors.grayscale[25],
		},
	},
});

/**
 * 히어로가 모바일에서 숨겨지면서 사라지는 <h1>을 대체한다.
 * 768px 이상에서는 히어로의 <h1>이 보이므로 이건 숨는다.
 * 어느 브레이크포인트에서도 노출되는 <h1>은 정확히 하나다.
 */
export const mobileHeading = style({
	position: "absolute",
	width: "1px",
	height: "1px",
	margin: "-1px",
	overflow: "hidden",
	clipPath: "inset(50%)",
	whiteSpace: "nowrap",

	"@media": {
		[media.mdUp]: {
			display: "none",
		},
	},
});

/** 광고 배너가 모바일에서 content의 좌우 패딩을 뚫고 나가게 한다. */
export const fullBleed = style({
	"@media": {
		[media.belowMd]: {
			marginLeft: `calc(-1 * (${CONTENT_SIDE_PADDING_MOBILE} + env(safe-area-inset-left)))`,
			marginRight: `calc(-1 * (${CONTENT_SIDE_PADDING_MOBILE} + env(safe-area-inset-right)))`,
		},
	},
});
