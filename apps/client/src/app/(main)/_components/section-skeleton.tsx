import { Skeleton } from "@/common/components/skeleton/skeleton";
import * as postGrid from "./popular-posts-section.css";
import * as header from "./section-header.css";
import * as toolRow from "./tool-row.css";

// 인덱스를 key로 쓰면 Biome이 막으므로 고유 키를 미리 만들어 둡니다.
const TOOL_SLOTS = Array.from({ length: 5 }, (_, i) => `tool-${i}`);
const POST_SLOTS = Array.from({ length: 6 }, (_, i) => `post-${i}`);

const SectionHeaderSkeleton = () => (
	<div className={header.container}>
		<Skeleton width="280px" height="26px" />
		<Skeleton width="42px" height="20px" />
	</div>
);

// toolRow.skeletonSlot / postGrid.skeletonSlot은 각각 ToolCard vertical과 MainCommunityCard의
// 실제 높이를 카드 css 파일과 공유한다. 다르게 잡으면 스트리밍이 끝나는 순간 아래 섹션이 밀린다.
// 두 그리드 모두 row/grid의 globalStyle이 그대로 적용돼 모바일 레이아웃(가로 스크롤/4~6번째 숨김)도 맞는다.
export const ToolRowSkeleton = () => (
	<section>
		<SectionHeaderSkeleton />
		<div className={toolRow.row}>
			{TOOL_SLOTS.map((slot) => (
				<Skeleton key={slot} className={toolRow.skeletonSlot} radius="16px" />
			))}
		</div>
	</section>
);

export const PostGridSkeleton = () => (
	<section>
		<SectionHeaderSkeleton />
		<div className={postGrid.grid}>
			{POST_SLOTS.map((slot) => (
				<Skeleton key={slot} className={postGrid.skeletonSlot} radius="16px" />
			))}
		</div>
	</section>
);
