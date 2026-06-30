import type { PostComment, PostDetail } from "../_types";

/**
 * TODO(api): 아래 목데이터는 디자인 구현용 임시 데이터입니다.
 * 다음 스텝에서 BoardApi.getBoardDetail / getComments 연동으로 교체됩니다.
 */

export const getMockPostDetail = (boardId: number): PostDetail => {
	const imageCount = boardId % 2 === 0 ? 1 : 3;

	return {
		boardId,
		tool: { toolId: 1, toolName: "Adobe Illustrator" },
		title: "제목제목제목제목제목제목",
		author: "닉네임",
		date: "2025.01.01",
		content:
			"본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
		images: Array.from({ length: imageCount }, (_, i) => ({ id: i + 1 })),
		scrapCount: 35,
		isScrapped: false,
		commentCount: 8,
	};
};

export const MOCK_COMMENTS: PostComment[] = [
	{
		commentId: 1,
		author: "닉네임",
		date: "2025.01.01",
		time: "15:30",
		content:
			"댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글",
	},
	{
		commentId: 2,
		author: "닉네임",
		date: "2025.01.01",
		time: "15:30",
		content:
			"댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글",
		imageUrl: "placeholder",
	},
	{
		commentId: 3,
		author: "닉네임",
		date: "2025.01.01",
		time: "15:30",
		content:
			"댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글",
	},
	{
		commentId: 4,
		author: "닉네임",
		date: "2025.01.01",
		time: "15:30",
		content:
			"댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글",
	},
];
