"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { PostCard } from "@/app/community/_components/community-post-list";
import type { BoardItem } from "@/common/api/models/board.model";
import { normalizeBoardSearchResponse } from "@/common/api/models/search.model";
import { fetchMoreSearchBoardAction } from "../_actions/search-actions";
import * as s from "../styles/search-page.css";

interface BoardSearchResultsProps {
	initialPosts: BoardItem[];
	initialNextCursor: number | string | null;
	keyword: string;
}

export function BoardSearchResults({
	initialPosts,
	initialNextCursor,
	keyword,
}: BoardSearchResultsProps) {
	const [posts, setPosts] = useState<BoardItem[]>(initialPosts);
	const [nextCursor, setNextCursor] = useState<number | string | null>(initialNextCursor);
	const [hasMore, setHasMore] = useState<boolean>(
		initialNextCursor !== null && initialNextCursor !== undefined && initialNextCursor !== 0
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const sentinelRef = useRef<HTMLDivElement>(null);

	// Reset state when keyword or initialPosts change
	useEffect(() => {
		setPosts(initialPosts);
		setNextCursor(initialNextCursor);
		setHasMore(
			initialNextCursor !== null && initialNextCursor !== undefined && initialNextCursor !== 0
		);
		setIsLoading(false);
	}, [initialPosts, initialNextCursor]);

	const loadMore = useCallback(async () => {
		if (isLoading || !hasMore || !nextCursor || !keyword.trim()) return;

		setIsLoading(true);

		try {
			const res = await fetchMoreSearchBoardAction({
				keyword: keyword.trim(),
				nextCursor: nextCursor,
				size: 10,
			});

			if (res.success && res.data) {
				const { contents, nextCursor: newCursor } = normalizeBoardSearchResponse(res.data);

				if (contents.length > 0) {
					setPosts((prev) => {
						// Filter out duplicates by boardId
						const existingIds = new Set(prev.map((item) => item.boardId));
						const uniqueNewContents = contents.filter((item) => !existingIds.has(item.boardId));
						return [...prev, ...uniqueNewContents];
					});
				}

				if (
					newCursor !== null &&
					newCursor !== undefined &&
					newCursor !== 0 &&
					contents.length > 0
				) {
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

	if (!keyword.trim()) {
		return (
			<div className={s.emptyState}>
				<Image
					src="/icons/ic_search_iris300_20.svg"
					alt=""
					width={48}
					height={48}
					className={s.emptyIcon}
				/>
				<p className={s.emptyTitle}>검색어를 입력해보세요</p>
				<p className={s.emptyDescription}>커뮤니티에서 관심있는 툴 이야기나 글을 검색해보세요.</p>
			</div>
		);
	}

	if (posts.length === 0 && !isLoading) {
		return (
			<div className={s.emptyState}>
				<Image
					src="/icons/ic_search_iris300_20.svg"
					alt=""
					width={48}
					height={48}
					className={s.emptyIcon}
				/>
				<p className={s.emptyTitle}>
					&apos;{keyword}&apos;에 대한 커뮤니티 게시글 검색 결과가 없습니다
				</p>
				<p className={s.emptyDescription}>
					단어의 철자가 정확한지 확인하거나 다른 검색어를 입력해보세요.
				</p>
			</div>
		);
	}

	return (
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
	);
}
