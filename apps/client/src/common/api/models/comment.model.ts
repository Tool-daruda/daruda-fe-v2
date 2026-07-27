export interface GetCommentParams {
	boardId: number;
	size?: number;
	lastCommentId?: number;
}

export interface CommentItem {
	commentId: number;
	content: string;
	nickname: string;
	image?: string;
	isOwner?: boolean;
	updatedAt: string;
}

export interface GetCommentRetrieveResponse {
	commentList: CommentItem[];
	pageInfo: {
		totalElements: number;
		nextCursor: number;
	};
}

export interface CreateCommentReq {
	content: string;
	photoUrl?: string;
}

export interface CreateCommentRes {
	commentId: number;
}
