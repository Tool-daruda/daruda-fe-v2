import { media } from "@repo/ui/foundations";
import { globalStyle, style } from "@vanilla-extract/css";
import { TOOL_CARD_VERTICAL_HEIGHT } from "@/common/components/tool-card/tool-card.css";
import { CONTENT_SIDE_PADDING_MOBILE } from "@/common/styles/layout.css";

export const row = style({
	display: "grid",
	gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
	gap: "16px",

	"@media": {
		[media.belowMd]: {
			display: "flex",
			gap: "12px",
			overflowX: "auto",
			scrollSnapType: "x mandatory",
			// 스와이프가 끝까지 갔을 때 브라우저 뒤로가기 제스처를 막는다
			overscrollBehaviorX: "contain",
			scrollbarWidth: "none",
			// 섹션 패딩 바깥까지 스크롤되게 하되, 스냅은 20px 안에서 멈춘다
			marginLeft: `calc(-1 * ${CONTENT_SIDE_PADDING_MOBILE})`,
			marginRight: `calc(-1 * ${CONTENT_SIDE_PADDING_MOBILE})`,
			paddingLeft: CONTENT_SIDE_PADDING_MOBILE,
			paddingRight: CONTENT_SIDE_PADDING_MOBILE,
			scrollPaddingLeft: CONTENT_SIDE_PADDING_MOBILE,
		},
	},

	selectors: {
		"&::-webkit-scrollbar": { display: "none" },
	},
});

// row의 자식은 ToolCard의 루트이거나 스켈레톤이다. style()로는 자식을 못 잡으므로 globalStyle을 쓴다.
// flex-basis는 flex 부모에서만 의미가 있어 데스크톱 그리드에서는 무시된다.
globalStyle(`${row} > *`, {
	"@media": {
		[media.belowMd]: {
			flex: "0 0 218px",
			scrollSnapAlign: "start",
		},
	},
});

export const skeletonSlot = style({
	height: TOOL_CARD_VERTICAL_HEIGHT.desktop,

	"@media": {
		[media.belowMd]: {
			height: TOOL_CARD_VERTICAL_HEIGHT.mobile,
		},
	},
});
