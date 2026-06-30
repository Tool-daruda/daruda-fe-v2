import { BoardApi } from "@/common/api/board-api";
import PostItem from "@/common/components/post-item/post-item";
import { formatDate } from "@/common/utils";
import * as s from "./popular-posts-section.css";
import { SectionHeader } from "./section-header";

export const PopularPostsSection = async () => {
	const boardListRes = await BoardApi.getBoardList({ noTopic: true, size: 6 }).catch(() => null);

	const posts = boardListRes?.contents || [];

	if (posts.length === 0) return null;

	return (
		<section className={s.section}>
			<SectionHeader icon="📌" title="대학생들이 가장 많이 저장한 글이에요" moreHref="/community" />

			<div className={s.grid}>
				{posts.map((post) => (
					<PostItem
						key={post.boardId}
						post={{
							id: post.boardId,
							tool: post.toolName,
							author: post.author,
							date: formatDate(post.updatedAt),
							title: post.title,
							content: post.content,
							comments: post.commentCount,
							// TODO: 스크랩 수 필요
							bookmarks: post.isScraped ? 1 : 0,
						}}
					/>
				))}
			</div>
		</section>
	);
};
