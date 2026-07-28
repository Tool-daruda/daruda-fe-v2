import { notFound } from "next/navigation";
import { BoardApi } from "@/common/api/board-api";
import { PostForm } from "../../_components/post-form/post-form";
import { getCommunityFilterCategories } from "../../_lib/get-filter-categories";

interface Props {
	params: Promise<{
		id: string;
	}>;
}

export default async function CommunityEditPage({ params }: Props) {
	const { id } = await params;
	const boardId = Number(id);

	if (Number.isNaN(boardId)) notFound();

	const [post, categories] = await Promise.all([
		BoardApi.getBoardDetail(boardId).catch(() => null),
		getCommunityFilterCategories().catch(() => []),
	]);

	if (!post) notFound();

	const tools = categories.flatMap((category) => category.tools);

	return (
		<PostForm
			mode="edit"
			tools={tools}
			initialValues={{
				boardId: post.boardId,
				title: post.title,
				content: post.content,
				images: post.images,
				tool: post.toolName
					? { toolId: post.toolId, toolName: post.toolName, toolLogo: post.toolLogo }
					: null,
			}}
		/>
	);
}
