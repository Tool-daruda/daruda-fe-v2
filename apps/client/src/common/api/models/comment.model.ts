import type { FromSpec, Schemas } from "@repo/api-types/helpers";

export interface GetCommentParams {
	boardId: number;
	size?: number;
	lastCommentId?: number;
}

// 프로필 이미지를 등록하지 않은 사용자는 image가 비어 있습니다.
export type CommentItem = FromSpec<"GetCommentResponse", { image?: string }>;

export type GetCommentRetrieveResponse = FromSpec<
	"GetCommentRetrieveResponse",
	{ commentList: CommentItem[] }
>;

export type CreateCommentReq = Schemas["CreateCommentRequest"];

// 생성된 댓글 전체를 돌려주므로 재조회 없이 목록에 바로 이어붙일 수 있습니다.
export type CreateCommentRes = FromSpec<"CreateCommentResponse", { image?: string }>;
