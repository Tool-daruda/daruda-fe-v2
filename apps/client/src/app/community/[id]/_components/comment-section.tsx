import Image from "next/image";
import type { CommentItem } from "@/common/api/models/comment.model";
import { formatDate, formatTime } from "@/common/utils";
import * as s from "./styles/comment-section.css";

interface CommentSectionProps {
	commentCount: number;
	comments: CommentItem[];
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
					<CommentRow key={comment.commentId} comment={comment} />
				))}
			</div>
		</div>
	);
};

const CommentRow = ({ comment }: { comment: CommentItem }) => {
	return (
		<div className={s.item}>
			<div className={s.itemHead}>
				<div className={s.itemHeadLeft}>
					<span className={s.author}>{comment.nickname}</span>
					<div className={s.metaDivider} />
					<span className={s.meta}>{formatDate(comment.updatedAt)}</span>
					<span className={s.meta}>{formatTime(comment.updatedAt)}</span>
				</div>
				<button type="button" className={s.etcButton} aria-label="더보기">
					<Image src="/icons/community/ic_etc_24.svg" alt="" width={18} height={4} />
				</button>
			</div>

			<p className={s.content}>{comment.content}</p>

			{comment.image && (
				<div className={s.image}>
					<Image src={comment.image} alt="" fill style={{ objectFit: "cover" }} />
				</div>
			)}
		</div>
	);
};
