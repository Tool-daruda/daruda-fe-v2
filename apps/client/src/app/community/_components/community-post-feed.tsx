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
	const posts = postsRes?.contents || [];
	return <CommunityPostList posts={posts} sortBy={sortBy} />;
};
