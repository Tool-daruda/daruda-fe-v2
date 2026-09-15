import { media } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

/**
 * 좌우 여백(24px)을 포함한 콘텐츠 컨테이너 폭.
 * 실제 콘텐츠 폭은 1006px로, Figma 1366 프레임의 좌우 180px 여백과 같다.
 */
export const CONTENT_MAX_WIDTH = "1054px";

export const CONTENT_SIDE_PADDING = "24px";

/**
 * 모바일(767px 이하) 콘텐츠 좌우 여백.
 * 디자인 헤더는 16px이지만 전 페이지 공통 패딩과 통일하기 위해 20px로 맞춘다.
 */
export const CONTENT_SIDE_PADDING_MOBILE = "20px";

/**
 * 전 페이지 공통 콘텐츠 컨테이너.
 * 세로 여백은 페이지마다 다르므로 `style([pageContainer, { paddingTop, paddingBottom }])`로 조합한다.
 * 배경이 화면 전체로 깔리는 영역(히어로 등)은 이 컨테이너 바깥에 두고 안쪽에서만 조합한다.
 */
// padding 축약형을 쓰면 이 스타일을 조합한 쪽의 paddingTop/Bottom을 CSS 순서에 따라 덮어쓴다.
// 세로 여백은 조합하는 쪽이 정하므로 가로만 롱핸드로 지정한다.
export const pageContainer = style({
	width: "100%",
	maxWidth: CONTENT_MAX_WIDTH,
	margin: "0 auto",
	paddingLeft: CONTENT_SIDE_PADDING,
	paddingRight: CONTENT_SIDE_PADDING,

	"@media": {
		[media.belowMd]: {
			// 가로 방향 safe-area는 가로모드 노치에서만 0이 아니다.
			paddingLeft: `calc(${CONTENT_SIDE_PADDING_MOBILE} + env(safe-area-inset-left))`,
			paddingRight: `calc(${CONTENT_SIDE_PADDING_MOBILE} + env(safe-area-inset-right))`,
		},
	},
});
