import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BoardApi } from "@/common/api/board-api";
import { CommentSectionFeed } from "./_components/comment-section-feed";
import { CommentSectionSkeleton } from "./_components/comment-section-skeleton";
import { PostDetailPage } from "./_components/post-detail-page";

interface Props {
	params: Promise<{
		id: string;
	}>;
}

export default async function CommunityPostDetailRoute({ params }: Props) {
	const { id } = await params;
	const boardId = Number(id);

	if (Number.isNaN(boardId)) notFound();

	// 404 상태 코드를 지키기 위해 상세 조회는 의도적으로 await한다.
	const post = await BoardApi.getBoardDetail(boardId).catch(() => null);

	if (!post) notFound();

	return (
		<PostDetailPage post={post}>
			<Suspense fallback={<CommentSectionSkeleton commentCount={post.commentCount} />}>
				<CommentSectionFeed boardId={post.boardId} commentCount={post.commentCount} />
			</Suspense>
		</PostDetailPage>
	);
}
