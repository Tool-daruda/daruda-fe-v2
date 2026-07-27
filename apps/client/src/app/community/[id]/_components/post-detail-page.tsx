import type { BoardItem } from "@/common/api/models/board.model";
import type { CommentItem } from "@/common/api/models/comment.model";
import { CommentInput } from "./comment-input";
import { CommentSection } from "./comment-section";
import { PostBookmarkButton } from "./post-bookmark-button";
import { PostContent } from "./post-content";
import { PostHeader } from "./post-header";
import * as s from "./styles/post-detail-page.css";

interface PostDetailPageProps {
	post: BoardItem;
	comments: CommentItem[];
}

export const PostDetailPage = ({ post, comments }: PostDetailPageProps) => {
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

			<CommentSection boardId={post.boardId} commentCount={post.commentCount} comments={comments} />
		</div>
	);
};
