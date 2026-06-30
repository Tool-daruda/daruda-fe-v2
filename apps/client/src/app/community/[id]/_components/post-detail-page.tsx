import type { PostComment, PostDetail } from "../_types";
import { CommentInput } from "./comment-input";
import { CommentSection } from "./comment-section";
import { PostBookmarkButton } from "./post-bookmark-button";
import { PostContent } from "./post-content";
import { PostHeader } from "./post-header";
import * as s from "./styles/post-detail-page.css";

interface PostDetailPageProps {
	post: PostDetail;
	comments: PostComment[];
}

export const PostDetailPage = ({ post, comments }: PostDetailPageProps) => {
	return (
		<div className={s.container}>
			<div className={s.topGroup}>
				<PostHeader post={post} />
				<PostContent content={post.content} images={post.images} />
			</div>

			<div className={s.actionsArea}>
				<PostBookmarkButton initialCount={post.scrapCount} initialScrapped={post.isScrapped} />
				<CommentInput />
			</div>

			<CommentSection commentCount={post.commentCount} comments={comments} />
		</div>
	);
};
