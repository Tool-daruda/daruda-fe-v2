import { BoardApi } from "@/common/api/board-api";
import type { BoardSortBy } from "@/common/api/models/board.model";
import { CommunityPostList } from "./community-post-list";

const POST_LIST_SIZE = 10;

interface CommunityPostFeedProps {
	toolId?: number;
	noTopic?: boolean;
	sortBy: BoardSortBy;
}

export const CommunityPostFeed = async ({ toolId, noTopic, sortBy }: CommunityPostFeedProps) => {
	const postsRes = await BoardApi.getBoardList({
		toolId,
		noTopic,
		sortBy,
		size: POST_LIST_SIZE,
	}).catch(() => null);

	// 필터·정렬이 바뀌면 key가 바뀌어 인스턴스가 새로 만들어지고 누적분이 버려진다.
	// 반대로 재검증(updateTag)으로 이 컴포넌트만 다시 렌더될 때는 key가 같아 누적분이 유지된다.
	return (
		<CommunityPostList
			key={`${toolId ?? "all"}-${noTopic ?? false}-${sortBy}`}
			initialPosts={postsRes?.contents ?? []}
			initialNextCursor={postsRes?.scrollPaginationDto?.nextCursor ?? null}
			initialNextScrapCount={postsRes?.nextScrapCount ?? null}
			pageSize={POST_LIST_SIZE}
			toolId={toolId}
			noTopic={noTopic}
			sortBy={sortBy}
		/>
	);
};
