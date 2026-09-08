import { CommentApi } from "@/common/api/comment-api";
import { CommentSection } from "./comment-section";

export const COMMENT_LIST_SIZE = 50;

interface CommentSectionFeedProps {
	boardId: number;
	commentCount: number;
}

export const CommentSectionFeed = async ({ boardId, commentCount }: CommentSectionFeedProps) => {
	const commentsRes = await CommentApi.getComments({ boardId, size: COMMENT_LIST_SIZE }).catch(
		() => null
	);

	return (
		// 댓글 작성/삭제로 commentCount가 바뀔 때마다 새로 받은 1페이지로 되돌린다.
		<CommentSection
			key={commentCount}
			boardId={boardId}
			commentCount={commentCount}
			initialComments={commentsRes?.commentList ?? []}
			initialNextCursor={commentsRes?.pageInfo?.nextCursor ?? null}
			pageSize={COMMENT_LIST_SIZE}
		/>
	);
};
