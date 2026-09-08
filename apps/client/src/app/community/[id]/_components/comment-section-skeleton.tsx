import { Skeleton } from "@/common/components/skeleton/skeleton";
import * as s from "./styles/comment-section.css";

interface CommentSectionSkeletonProps {
	commentCount: number;
}

// 댓글 행 높이는 내용 길이마다 달라서 흔한 1줄 댓글 크기로 근사한다.
export const CommentSectionSkeleton = ({ commentCount }: CommentSectionSkeletonProps) => (
	<div className={s.wrapper}>
		<div className={s.headRow}>
			<span>댓글</span>
			<span>
				<span className={s.count}>{commentCount}</span>개
			</span>
		</div>

		<div className={s.divider} />

		<div className={s.list}>
			{Array.from({ length: Math.min(commentCount, 5) }, (_, i) => `comment-skeleton-${i}`).map(
				(key) => (
					<Skeleton key={key} height="72px" radius="8px" />
				)
			)}
		</div>
	</div>
);
