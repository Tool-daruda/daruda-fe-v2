import { UserApi } from "@/common/api/user-api";
import PostItem from "@/common/components/post-item/post-item";
import { formatDate } from "@/common/utils";
import * as styles from "../community.css";

export default async function SavedPostsPage() {
	const scrapData = await UserApi.getScrapBoards({ page: 1, size: 5 });
	const boardList = scrapData?.boardList || [];

	if (boardList.length === 0) {
		return <div>스크랩한 게시글이 없습니다.</div>;
	}

	return (
		<div className={styles.postList}>
			{boardList.map((board) => {
				const formattedPost = {
					id: board.boardId,
					tool: board.toolName,
					author: board.author,
					date: formatDate(board.updatedAt),
					title: board.title,
					content: board.content,
					comments: board.commentCount,
					bookmarks: board.scrapCount,
				};

				return <PostItem key={board.boardId} post={formattedPost} />;
			})}
		</div>
	);
}
