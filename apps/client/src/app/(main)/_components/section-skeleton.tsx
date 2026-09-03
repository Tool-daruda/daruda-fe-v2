import { Skeleton } from "@/common/components/skeleton/skeleton";
import * as postGrid from "./popular-posts-section.css";
import * as header from "./section-header.css";
import * as toolRow from "./tool-row.css";

// Biome noArrayIndexKey를 피하려고 인덱스 대신 고유 키를 만들어 둡니다.
const TOOL_SLOTS = Array.from({ length: 5 }, (_, i) => `tool-${i}`);
const POST_SLOTS = Array.from({ length: 6 }, (_, i) => `post-${i}`);

// 섹션 헤더는 SectionHeader와 같은 컨테이너를 써서 marginBottom(20px)까지 맞춥니다.
const SectionHeaderSkeleton = () => (
	<div className={header.container}>
		<Skeleton width="280px" height="26px" />
		<Skeleton width="42px" height="20px" />
	</div>
);

/**
 * @description 메인 툴 섹션(가로 5칸)의 로딩 자리를 채웁니다.
 * @note 카드 높이 150px은 ToolCard vertical variant와 같습니다.
 */
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

/**
 * @description 메인 인기글 섹션(2열 그리드)의 로딩 자리를 채웁니다.
 */
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
