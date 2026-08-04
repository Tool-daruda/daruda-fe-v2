import { BoardApi } from "@/common/api/board-api";
import { CommunityHotSection } from "./community-hot-section";

const HOT_POST_SIZE = 3;

export const CommunityHotFeed = async () => {
	const hotPostsRes = await BoardApi.getBoardList({ sortBy: "SCRAP", size: HOT_POST_SIZE }).catch(
		() => null
	);
	const hotPosts = hotPostsRes?.contents || [];
	return <CommunityHotSection posts={hotPosts} />;
};
