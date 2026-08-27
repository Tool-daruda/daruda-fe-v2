import { UserApi } from "@/common/api/user-api";
import { BoardList } from "../_components/board-list";

const PAGE_SIZE = 10;

export default async function SavedPostsPage() {
	const scrapData = await UserApi.getScrapBoards({ page: 1, size: PAGE_SIZE });

	return (
		<BoardList
			initialBoardList={scrapData?.boardList ?? []}
			initialPageInfo={scrapData?.pageInfo ?? { pageNo: 1, size: PAGE_SIZE, totalPages: 1 }}
			type="scrap"
			emptyMessage="스크랩한 게시글이 없습니다."
		/>
	);
}
