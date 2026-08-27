"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	deleteBoardAction,
	fetchMoreBoardListAction,
	postBoardScrapAction,
} from "@/common/api/actions/board.actions";
import type { BoardItem, BoardSortBy } from "@/common/api/models/board.model";
import { LoadingSentinel } from "@/common/components/loading-spinner/loading-spinner";
import { MoreMenu, type MoreMenuItem } from "@/common/components/more-menu/more-menu";
import { ReportModal } from "@/common/components/report-modal/report-modal";
import { toast } from "@/common/components/toast";
import { useActionError } from "@/common/hooks/use-action-error";
import { useContentMenu } from "@/common/hooks/use-content-menu";
import { formatDate } from "@/common/utils";
import { CommunitySortTabs } from "./community-sort-tabs";
import * as s from "./styles/community-post-list.css";

const hasValidCursor = (cursor: number | null): cursor is number =>
	cursor !== null && Number.isFinite(cursor) && cursor > 0;

interface CommunityPostListProps {
	initialPosts: BoardItem[];
	initialNextCursor: number | null;
	initialNextScrapCount: number | null;
	pageSize: number;
	toolId?: number;
	noTopic?: boolean;
	sortBy: BoardSortBy;
}

export const CommunityPostList = ({
	initialPosts,
	initialNextCursor,
	initialNextScrapCount,
	pageSize,
	toolId,
	noTopic,
	sortBy,
}: CommunityPostListProps) => {
	const [posts, setPosts] = useState(initialPosts);
	const [nextCursor, setNextCursor] = useState(initialNextCursor);
	const [nextScrapCount, setNextScrapCount] = useState(initialNextScrapCount);
	const [isLoading, setIsLoading] = useState(false);

	const sentinelRef = useRef<HTMLDivElement>(null);

	// SCRAP 정렬은 커서 두 개를 함께 보내야 하므로, 스크랩 수 커서가 없으면 더 부를 수 없다.
	const hasMore = hasValidCursor(nextCursor) && (sortBy !== "SCRAP" || nextScrapCount !== null);

	const loadMore = useCallback(async () => {
		if (isLoading || !hasMore || !hasValidCursor(nextCursor)) return;

		setIsLoading(true);

		try {
			// 두 정렬 모두 서버가 준 커서를 그대로 돌려주면 된다.
			// (LATEST는 다음 페이지 첫 글을 포함하는 커서, SCRAP은 현재 페이지 마지막 글을 제외하는 커서)
			const res = await fetchMoreBoardListAction({
				toolId,
				noTopic,
				sortBy,
				size: pageSize,
				lastBoardId: nextCursor,
				...(sortBy === "SCRAP" && nextScrapCount !== null
					? { lastScrapCount: nextScrapCount }
					: {}),
			});

			if (!res.success || !res.data || res.data.contents.length === 0) {
				setNextCursor(null);
				return;
			}

			const { contents, scrollPaginationDto } = res.data;

			setPosts((prev) => {
				const existingIds = new Set(prev.map((post) => post.boardId));
				return [...prev, ...contents.filter((post) => !existingIds.has(post.boardId))];
			});

			// 커서가 그대로면 같은 페이지를 무한히 다시 부르게 되므로 끝으로 본다.
			const newCursor = scrollPaginationDto?.nextCursor ?? null;
			setNextCursor(hasValidCursor(newCursor) && newCursor !== nextCursor ? newCursor : null);
			setNextScrapCount(res.data.nextScrapCount ?? null);
		} catch (error) {
			console.error("게시글 목록 추가 조회 실패:", error);
			setNextCursor(null);
		} finally {
			setIsLoading(false);
		}
	}, [isLoading, hasMore, nextCursor, nextScrapCount, pageSize, toolId, noTopic, sortBy]);

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

	// 누적된 목록은 재검증으로 갱신되지 않으므로, 뮤테이션 결과를 여기서 직접 반영한다.
	const handleDeleted = useCallback((boardId: number) => {
		setPosts((prev) => prev.filter((post) => post.boardId !== boardId));
	}, []);

	const handleScrapChanged = useCallback((boardId: number, isScraped: boolean) => {
		setPosts((prev) =>
			prev.map((post) =>
				post.boardId === boardId
					? {
							...post,
							isScraped,
							scrapCount: Math.max(0, post.scrapCount + (isScraped ? 1 : -1)),
						}
					: post
			)
		);
	}, []);

	return (
		<div className={s.wrapper}>
			<CommunitySortTabs sortBy={sortBy} />

			{posts.length === 0 ? (
				<p className={s.emptyState}>등록된 게시글이 없습니다.</p>
			) : (
				<>
					<div className={s.list}>
						{posts.map((post, index) => (
							<div key={post.boardId}>
								{index > 0 && <div className={s.itemDivider} />}
								<PostCard
									post={post}
									onDeleted={handleDeleted}
									onScrapChanged={handleScrapChanged}
								/>
							</div>
						))}
					</div>

					{hasMore && <LoadingSentinel ref={sentinelRef} isLoading={isLoading} />}
				</>
			)}
		</div>
	);
};

interface PostCardProps {
	post: BoardItem;
	onDeleted?: (boardId: number) => void;
	onScrapChanged?: (boardId: number, isScraped: boolean) => void;
}

export const PostCard = ({ post, onDeleted, onScrapChanged }: PostCardProps) => {
	const router = useRouter();
	const handleActionError = useActionError();
	const { isOpen, toggle, close, containerRef, isOwner, currentUser } = useContentMenu(post.author);
	const [reportOpen, setReportOpen] = useState(false);

	const ownerItems: MoreMenuItem[] = [
		{
			label: "수정하기",
			iconSrc: "/icons/community/ic_edit_20.svg",
			onClick: () => router.push(`/community/${post.boardId}/edit`),
		},
		{
			label: "삭제하기",
			iconSrc: "/icons/community/ic_delete_20.svg",
			onClick: async () => {
				const result = await deleteBoardAction({
					boardId: post.boardId,
					toolId: post.toolId || undefined,
				});
				if (result.success) {
					toast("게시글을 삭제했어요.");
					onDeleted?.(post.boardId);
					router.refresh();
				} else {
					toast(result.error || "삭제에 실패했어요.");
				}
			},
		},
	];

	const otherItems: MoreMenuItem[] = [
		{
			label: "저장하기",
			iconSrc: "/icons/community/ic_bookmark_20.svg",
			onClick: async () => {
				if (!currentUser) {
					router.push("/login");
					return;
				}
				const result = await postBoardScrapAction(post.boardId);
				if (result.success) {
					toast(result.data.scrap ? "게시글을 저장했어요." : "저장을 취소했어요.");
					onScrapChanged?.(post.boardId, result.data.scrap);
					router.refresh();
				} else {
					handleActionError(result, "저장에 실패했어요.");
				}
			},
		},
		{
			label: "신고하기",
			iconSrc: "/icons/community/ic_report_20.svg",
			onClick: () => setReportOpen(true),
		},
	];

	return (
		<div ref={containerRef} className={s.cardWrapper}>
			<Link href={`/community/${post.boardId}`} className={s.card}>
				<div className={s.cardHead}>
					<div className={s.cardHeadLeft}>
						{post.toolName && (
							<div className={s.toolChip}>
								<div className={s.toolLogo}>
									{post.toolLogo && (
										<Image src={post.toolLogo} alt="" fill style={{ objectFit: "cover" }} />
									)}
								</div>
								<span className={s.toolName}>{post.toolName}</span>
							</div>
						)}
						<div className={s.metaRow}>
							<span>{post.author}</span>
							<div className={s.metaDivider} />
							<span>{formatDate(post.updatedAt)}</span>
						</div>
					</div>
				</div>

				<div className={s.cardBody}>
					<div className={s.cardBodyLeft}>
						<div className={s.textBlock}>
							<p className={s.cardTitle}>{post.title}</p>
							<p className={s.cardContent}>{post.content}</p>
						</div>
						<div className={s.statsRow}>
							<span className={s.statItem}>
								<Image src="/svg/post/ic_comment_16.svg" alt="" width={16} height={16} />
								{post.commentCount}개
							</span>
							<span className={s.statItem}>
								<Image src="/svg/post/ic_bookmark_16.svg" alt="" width={16} height={16} />
								{post.scrapCount}개
							</span>
						</div>
					</div>
					{post.images?.[0] && (
						<div className={s.thumbnail}>
							<Image src={post.images[0]} alt={post.title} fill style={{ objectFit: "cover" }} />
						</div>
					)}
				</div>
			</Link>

			<button
				type="button"
				className={s.etcButton}
				onClick={toggle}
				aria-label="더보기"
				aria-expanded={isOpen}
				aria-haspopup="menu"
			>
				<Image src="/icons/community/ic_etc_20.svg" alt="" width={20} height={4} />
			</button>

			{isOpen && (
				<MoreMenu
					items={isOwner ? ownerItems : otherItems}
					onClose={close}
					className={s.dropdownCard}
				/>
			)}

			<ReportModal
				isOpen={reportOpen}
				onClose={() => setReportOpen(false)}
				target={{ boardId: post.boardId, commentId: null }}
				content={post.title}
			/>
		</div>
	);
};
