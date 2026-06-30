import { notFound } from "next/navigation";
import { PostDetailPage } from "./_components/post-detail-page";
import { getMockPostDetail, MOCK_COMMENTS } from "./_mocks/post-detail-mock";

interface Props {
	params: Promise<{
		id: string;
	}>;
}

// TODO(api): BoardApi.getBoardDetail / getComments 연동 시 목데이터를 실제 데이터로 교체합니다.
export default async function CommunityPostDetailRoute({ params }: Props) {
	const { id } = await params;
	const boardId = Number(id);

	if (Number.isNaN(boardId)) notFound();

	const post = getMockPostDetail(boardId);

	return <PostDetailPage post={post} comments={MOCK_COMMENTS} />;
}
