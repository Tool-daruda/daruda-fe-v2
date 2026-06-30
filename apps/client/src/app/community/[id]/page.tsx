import { notFound } from "next/navigation";
import { BoardApi } from "@/common/api/board-api";
import { CommentApi } from "@/common/api/comment-api";
import { PostDetailPage } from "./_components/post-detail-page";

interface Props {
	params: Promise<{
		id: string;
	}>;
}

const COMMENT_LIST_SIZE = 50;

export default async function CommunityPostDetailRoute({ params }: Props) {
	const { id } = await params;
	const boardId = Number(id);

	if (Number.isNaN(boardId)) notFound();

	const [post, commentsRes] = await Promise.all([
		BoardApi.getBoardDetail(boardId).catch(() => null),
		CommentApi.getComments({ boardId, size: COMMENT_LIST_SIZE }).catch(() => null),
	]);

	if (!post) notFound();

	return <PostDetailPage post={post} comments={commentsRes?.commentList || []} />;
}
