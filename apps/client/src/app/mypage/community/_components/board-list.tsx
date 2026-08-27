"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MyBoardItem, PageInfo } from "@/common/api/models/tool.model";
import PostItem from "@/common/components/post-item/post-item";
import { formatDate } from "@/common/utils";
import { fetchMoreMyBoardsAction, fetchMoreScrapBoardsAction } from "../_actions/board.actions";
import * as styles from "../community.css";

const PAGE_SIZE = 10;

const fetchMoreActionMap = {
	scrap: fetchMoreScrapBoardsAction,
	mine: fetchMoreMyBoardsAction,
};

interface BoardListProps {
	initialBoardList: MyBoardItem[];
	initialPageInfo: PageInfo;
	type: keyof typeof fetchMoreActionMap;
	emptyMessage: string;
}

export function BoardList({
	initialBoardList,
	initialPageInfo,
	type,
	emptyMessage,
}: BoardListProps) {
	const [boardList, setBoardList] = useState(initialBoardList);
	const [pageInfo, setPageInfo] = useState(initialPageInfo);
	const [isLoading, setIsLoading] = useState(false);

	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setBoardList(initialBoardList);
		setPageInfo(initialPageInfo);
	}, [initialBoardList, initialPageInfo]);

	const hasMore = pageInfo.pageNo < pageInfo.totalPages;

	const loadMore = useCallback(async () => {
		if (isLoading || !hasMore) return;

		setIsLoading(true);

		try {
			const res = await fetchMoreActionMap[type]({ page: pageInfo.pageNo + 1, size: PAGE_SIZE });

			if (!res.success || !res.data || res.data.boardList.length === 0) {
				setPageInfo((prev) => ({ ...prev, totalPages: prev.pageNo }));
				return;
			}

			const { boardList: nextBoards, pageInfo: nextPageInfo } = res.data;

			setBoardList((prev) => {
				const existingIds = new Set(prev.map((board) => board.boardId));
				return [...prev, ...nextBoards.filter((board) => !existingIds.has(board.boardId))];
			});
			setPageInfo(nextPageInfo);
		} catch (error) {
			console.error("게시글 추가 조회 실패:", error);
			setPageInfo((prev) => ({ ...prev, totalPages: prev.pageNo }));
		} finally {
			setIsLoading(false);
		}
	}, [isLoading, hasMore, pageInfo.pageNo, type]);

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

	if (boardList.length === 0) {
		return <div>{emptyMessage}</div>;
	}

	return (
		<div className={styles.postList}>
			{boardList.map((board) => (
				<PostItem
					key={board.boardId}
					post={{
						id: board.boardId,
						tool: board.toolName,
						author: board.author,
						date: formatDate(board.updatedAt),
						title: board.title,
						content: board.content,
						comments: board.commentCount,
						bookmarks: board.scrapCount,
					}}
				/>
			))}

			{hasMore && (
				<div ref={sentinelRef} className={styles.loadingTrigger}>
					{isLoading && <div className={styles.spinner} />}
				</div>
			)}
		</div>
	);
}
