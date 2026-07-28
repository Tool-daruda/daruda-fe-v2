import { fetchServer } from "./fetch-server";
import type { GetCommentParams, GetCommentRetrieveResponse } from "./models/comment.model";

/**
 * @description /api/v1/comment 엔드포인트와 통신하는 API 서비스입니다.
 */
export const CommentApi = {
	/**
	 * @description 게시글 댓글 조회
	 */
	getComments: async (params: GetCommentParams) => {
		const { boardId, size = 20, lastCommentId } = params;

		const queryParams = new URLSearchParams({
			"board-id": String(boardId),
			size: String(size),
		});

		if (lastCommentId !== undefined) queryParams.append("lastCommentId", String(lastCommentId));

		return fetchServer<GetCommentRetrieveResponse>(`/api/v1/comment?${queryParams.toString()}`, {
			next: { tags: [`board-${boardId}-comments`] },
		});
	},
};
