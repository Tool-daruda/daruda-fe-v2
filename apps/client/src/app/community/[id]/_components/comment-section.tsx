import Image from "next/image";
import type { PostComment } from "../_types";
import * as s from "./styles/comment-section.css";

interface CommentSectionProps {
	commentCount: number;
	comments: PostComment[];
}

export const CommentSection = ({ commentCount, comments }: CommentSectionProps) => {
	return (
		<div className={s.wrapper}>
			<div className={s.headRow}>
				<span>댓글</span>
				<span>
					<span className={s.count}>{commentCount}</span>개
				</span>
			</div>

			<div className={s.divider} />

			<div className={s.list}>
				{comments.map((comment) => (
					<CommentItem key={comment.commentId} comment={comment} />
				))}
			</div>
		</div>
	);
};

const CommentItem = ({ comment }: { comment: PostComment }) => {
	return (
		<div className={s.item}>
			<div className={s.itemHead}>
				<div className={s.itemHeadLeft}>
					<span className={s.author}>{comment.author}</span>
					<div className={s.metaDivider} />
					<span className={s.meta}>{comment.date}</span>
					<span className={s.meta}>{comment.time}</span>
				</div>
				<button type="button" className={s.etcButton} aria-label="더보기">
					<Image src="/icons/community/ic_etc_24.svg" alt="" width={18} height={4} />
				</button>
			</div>

			<p className={s.content}>{comment.content}</p>

			{comment.imageUrl && <div className={s.image} />}
		</div>
	);
};
