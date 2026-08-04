import { UserApi } from "@/common/api/user-api";
import PostItem from "@/common/components/post-item/post-item";
import { formatDate } from "@/common/utils";
import * as styles from "../community.css";

export default async function MyPostsPage() {
	// TODO: 페이지네이션 구현 시 page와 size를 동적으로 받아오도록 수정 필요
	const boardData = await UserApi.getUserBoards({ page: 1, size: 5 });
	const boardList = boardData?.boardList || [];

	if (boardList.length === 0) {
		return <div>작성한 게시글이 없습니다.</div>;
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
