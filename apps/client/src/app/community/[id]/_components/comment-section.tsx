"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchMoreCommentsAction } from "@/app/community/_actions/comment-actions";
import type { CommentItem } from "@/common/api/models/comment.model";
import { LoadingSentinel } from "@/common/components/loading-spinner/loading-spinner";
import { MoreMenu, type MoreMenuItem } from "@/common/components/more-menu/more-menu";
import { ReportModal } from "@/common/components/report-modal/report-modal";
import { toast } from "@/common/components/toast";
import { useContentMenu } from "@/common/hooks/use-content-menu";
import { formatDate, formatTime } from "@/common/utils";
import { deleteCommentAction } from "../../_actions/comment-actions";
import * as s from "./styles/comment-section.css";

const hasValidCursor = (cursor: number | null): cursor is number =>
	cursor !== null && Number.isFinite(cursor) && cursor > 0;

interface CommentSectionProps {
	boardId: number;
	commentCount: number;
	initialComments: CommentItem[];
	initialNextCursor: number | null;
	pageSize: number;
}

export const CommentSection = ({
	boardId,
	commentCount,
	initialComments,
	initialNextCursor,
	pageSize,
}: CommentSectionProps) => {
	const [comments, setComments] = useState(initialComments);
	const [nextCursor, setNextCursor] = useState(initialNextCursor);
	const [isLoading, setIsLoading] = useState(false);

	const sentinelRef = useRef<HTMLDivElement>(null);
	const hasMore = hasValidCursor(nextCursor);

	const loadMore = useCallback(async () => {
		if (isLoading || !hasValidCursor(nextCursor)) return;

		setIsLoading(true);

		try {
			const res = await fetchMoreCommentsAction({
				boardId,
				size: pageSize,
				lastCommentId: nextCursor,
			});

			if (!res.success || !res.data || res.data.commentList.length === 0) {
				setNextCursor(null);
				return;
			}

			setComments((prev) => [...prev, ...res.data.commentList]);

			const newCursor = res.data.pageInfo?.nextCursor ?? null;
			setNextCursor(hasValidCursor(newCursor) && newCursor !== nextCursor ? newCursor : null);
		} catch (error) {
			console.error("댓글 추가 조회 실패:", error);
			setNextCursor(null);
		} finally {
			setIsLoading(false);
		}
	}, [isLoading, nextCursor, boardId, pageSize]);

	useEffect(() => {
		const sentinelEl = sentinelRef.current;
		if (!sentinelEl || !hasMore) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					loadMore();
				}
			},
			{ rootMargin: "200px" }
		);

		observer.observe(sentinelEl);

		return () => {
			observer.unobserve(sentinelEl);
		};
	}, [loadMore, hasMore]);

	const handleDeleted = useCallback((commentId: number) => {
		setComments((prev) => prev.filter((comment) => comment.commentId !== commentId));
	}, []);

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
					<CommentRow
						key={comment.commentId}
						comment={comment}
						boardId={boardId}
						onDeleted={handleDeleted}
					/>
				))}
			</div>

			{hasMore && <LoadingSentinel ref={sentinelRef} isLoading={isLoading} />}
		</div>
	);
};

interface CommentRowProps {
	comment: CommentItem;
	boardId: number;
	onDeleted: (commentId: number) => void;
}

const CommentRow = ({ comment, boardId, onDeleted }: CommentRowProps) => {
	const router = useRouter();
	const { isOpen, toggle, close, containerRef, isOwner } = useContentMenu(comment.nickname);
	const [reportOpen, setReportOpen] = useState(false);

	const ownerItems: MoreMenuItem[] = [
		{
			label: "삭제하기",
			iconSrc: "/icons/community/ic_delete_20.svg",
			onClick: async () => {
				const result = await deleteCommentAction({ commentId: comment.commentId, boardId });
				if (result.success) {
					onDeleted(comment.commentId);
					router.refresh();
				} else {
					toast(result.error || "삭제에 실패했어요.");
				}
			},
		},
	];

	const otherItems: MoreMenuItem[] = [
		{
			label: "신고하기",
			iconSrc: "/icons/community/ic_report_20.svg",
			onClick: () => setReportOpen(true),
		},
	];

	return (
		<div className={s.item}>
			<div className={s.itemHead}>
				<div className={s.itemHeadLeft}>
					<span className={s.author}>{comment.nickname}</span>
					<div className={s.metaDivider} />
					<span className={s.meta}>{formatDate(comment.updatedAt)}</span>
					<span className={s.meta}>{formatTime(comment.updatedAt)}</span>
				</div>

				<div ref={containerRef} className={s.menuWrapper}>
					<button
						type="button"
						className={s.etcButton}
						onClick={toggle}
						aria-label="더보기"
						aria-expanded={isOpen}
						aria-haspopup="menu"
					>
						<Image src="/icons/community/ic_etc_24.svg" alt="" width={18} height={4} />
					</button>
					{isOpen && (
						<MoreMenu
							items={isOwner ? ownerItems : otherItems}
							onClose={close}
							className={s.dropdown}
						/>
					)}
				</div>
			</div>

			<p className={s.content}>{comment.content}</p>

			{comment.image && (
				<div className={s.image}>
					<Image src={comment.image} alt="" fill style={{ objectFit: "cover" }} />
				</div>
			)}

			<ReportModal
				isOpen={reportOpen}
				onClose={() => setReportOpen(false)}
				target={{ boardId: null, commentId: comment.commentId }}
				content={comment.content}
			/>
		</div>
	);
};
