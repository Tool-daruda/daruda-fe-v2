import type { ReactNode } from "react";
import type { BoardItem } from "@/common/api/models/board.model";
import { CommentInput } from "./comment-input";
import { PostBookmarkButton } from "./post-bookmark-button";
import { PostContent } from "./post-content";
import { PostHeader } from "./post-header";
import * as s from "./styles/post-detail-page.css";

interface PostDetailPageProps {
	post: BoardItem;
	children: ReactNode;
}

export const PostDetailPage = ({ post, children }: PostDetailPageProps) => {
	return (
		<div className={s.container}>
			<div className={s.topGroup}>
				<PostHeader post={post} />
				<PostContent content={post.content} images={post.images} />
			</div>

			<div className={s.actionsArea}>
				<PostBookmarkButton boardId={post.boardId} initialScrapped={post.isScraped} />
				<CommentInput boardId={post.boardId} />
			</div>

			{children}
		</div>
	);
};
