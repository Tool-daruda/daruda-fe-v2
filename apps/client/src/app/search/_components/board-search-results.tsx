"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PostCard } from "@/app/community/_components/community-post-list";
import type { BoardItem } from "@/common/api/models/board.model";
import { normalizeBoardSearchResponse } from "@/common/api/models/search.model";
import { fetchMoreSearchBoardAction } from "../_actions/search-actions";
import * as s from "../styles/search-page.css";

interface BoardSearchResultsProps {
	initialPosts: BoardItem[];
	initialNextCursor: number | string | null;
	totalCount?: number;
	keyword: string;
}

const isValidCursor = (cursor: number | string | null | undefined): boolean => {
	if (cursor === null || cursor === undefined || cursor === "") return false;
	const num = Number(cursor);
	return !Number.isNaN(num) && num > 0;
};

export function BoardSearchResults({
	initialPosts,
	initialNextCursor,
	totalCount,
	keyword,
}: BoardSearchResultsProps) {
	const [posts, setPosts] = useState<BoardItem[]>(initialPosts);
	const [nextCursor, setNextCursor] = useState<number | string | null>(initialNextCursor);
	const [hasMore, setHasMore] = useState<boolean>(isValidCursor(initialNextCursor));
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setPosts(initialPosts);
		setNextCursor(initialNextCursor);
		setHasMore(isValidCursor(initialNextCursor));
		setIsLoading(false);
	}, [initialPosts, initialNextCursor]);

	const loadMore = useCallback(async () => {
		if (isLoading || !hasMore || !isValidCursor(nextCursor) || !keyword.trim()) return;

		setIsLoading(true);

		try {
			const res = await fetchMoreSearchBoardAction({
				keyword: keyword.trim(),
				nextCursor: nextCursor ?? undefined,
				size: 10,
			});

			if (res.success && res.data) {
				const { contents, nextCursor: newCursor } = normalizeBoardSearchResponse(res.data);

				if (contents.length > 0) {
					setPosts((prev) => {
						const existingIds = new Set(prev.map((item) => item.boardId));
						const uniqueNewContents = contents.filter((item) => !existingIds.has(item.boardId));
						return [...prev, ...uniqueNewContents];
					});
				}

				if (isValidCursor(newCursor) && contents.length > 0) {
					setNextCursor(newCursor);
				} else {
					setNextCursor(null);
					setHasMore(false);
				}
			} else {
				setHasMore(false);
			}
		} catch (error) {
			console.error("Failed to fetch more board search results:", error);
			setHasMore(false);
		} finally {
			setIsLoading(false);
		}
	}, [isLoading, hasMore, nextCursor, keyword]);

	useEffect(() => {
		const sentinelEl = sentinelRef.current;
		if (!sentinelEl || !hasMore) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const target = entries[0];
				if (target?.isIntersecting) {
					loadMore();
				}
			},
			{ rootMargin: "200px" }
		);

		observer.observe(sentinelEl);

		return () => {
			if (sentinelEl) observer.unobserve(sentinelEl);
		};
	}, [loadMore, hasMore]);

	if (!keyword.trim()) return null;

	const displayCount = totalCount !== undefined ? totalCount : posts.length;

	return (
		<section className={s.sectionContainer}>
			<div className={s.sectionHeader}>
				<h2 className={s.sectionTitle}>커뮤니티</h2>
				<span className={s.sectionCountChip}>{displayCount}</span>
			</div>

			{posts.length === 0 && !isLoading ? (
				<div className={s.emptySection}>
					<p className={s.emptyTitle}>
						&apos;{keyword}&apos;에 대한 커뮤니티 게시글 검색 결과가 없습니다.
					</p>
				</div>
			) : (
				<div className={s.boardList}>
					{posts.map((post, index) => (
						<div key={post.boardId}>
							{index > 0 && <div className={s.boardItemDivider} />}
							<PostCard post={post} />
						</div>
					))}

					{hasMore && (
						<div ref={sentinelRef} className={s.loadingTrigger}>
							{isLoading && <div className={s.spinner} />}
						</div>
					)}
				</div>
			)}
		</section>
	);
}
