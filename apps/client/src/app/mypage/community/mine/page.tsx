import { UserApi } from "@/common/api/user-api";
import { BoardList } from "../_components/board-list";

const PAGE_SIZE = 10;

export default async function MyPostsPage() {
	const boardData = await UserApi.getUserBoards({ page: 1, size: PAGE_SIZE });

	return (
		<BoardList
			initialBoardList={boardData?.boardList ?? []}
			initialPageInfo={boardData?.pageInfo ?? { pageNo: 1, size: PAGE_SIZE, totalPages: 1 }}
			type="mine"
			emptyMessage="작성한 게시글이 없습니다."
		/>
	);
}
