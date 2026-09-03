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

// 150px, 148px은 각각 ToolCard vertical과 MainCommunityCard의 실제 높이입니다.
// 다르게 잡으면 스트리밍이 끝나는 순간 아래 섹션이 밀립니다.
export const ToolRowSkeleton = () => (
	<section>
		<SectionHeaderSkeleton />
		<div className={toolRow.row}>
			{TOOL_SLOTS.map((slot) => (
				<Skeleton key={slot} height="150px" radius="16px" />
			))}
		</div>
	</section>
);

export const PostGridSkeleton = () => (
	<section>
		<SectionHeaderSkeleton />
		<div className={postGrid.grid}>
			{POST_SLOTS.map((slot) => (
				<Skeleton key={slot} height="148px" radius="16px" />
			))}
		</div>
	</section>
);
