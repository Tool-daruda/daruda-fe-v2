"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchMoreToolListAction } from "@/common/api/actions/tool.actions";
import type { ToolSummary } from "@/common/api/models/tool.model";
import ToolCard from "@/common/components/tool-card/tool-card";
import { LICENSE_MAP } from "@/common/constants/price";
import * as s from "./toollist.css";

interface ToolListGridProps {
	initialTools: ToolSummary[];
	initialNextCursor: number | null;
	totalElements: number;
	category: string;
	criteria: string;
	isFree: boolean;
}

const hasValidCursor = (cursor: number | null): cursor is number =>
	cursor !== null && Number.isFinite(cursor) && cursor > 0;

export const ToolListGrid = ({
	initialTools,
	initialNextCursor,
	totalElements,
	category,
	criteria,
	isFree,
}: ToolListGridProps) => {
	const [tools, setTools] = useState<ToolSummary[]>(initialTools);
	const [nextCursor, setNextCursor] = useState<number | null>(initialNextCursor);
	const [isLoading, setIsLoading] = useState(false);

	const sentinelRef = useRef<HTMLDivElement>(null);

	// 카테고리·정렬·무료 필터가 바뀌면 서버가 새 첫 페이지를 내려주므로 누적분을 버린다.
	useEffect(() => {
		setTools(initialTools);
		setNextCursor(initialNextCursor);
		setIsLoading(false);
	}, [initialTools, initialNextCursor]);

	const hasMore = hasValidCursor(nextCursor) && tools.length < totalElements;

	const loadMore = useCallback(async () => {
		if (isLoading || !hasMore || !hasValidCursor(nextCursor)) return;

		setIsLoading(true);

		try {
			const res = await fetchMoreToolListAction({
				category,
				criteria,
				isFree,
				lastToolId: nextCursor,
			});

			if (!res.success || !res.data || res.data.tools.length === 0) {
				setNextCursor(null);
				return;
			}

			const { tools: nextTools, scrollPaginationDto } = res.data;

			setTools((prev) => {
				const existingIds = new Set(prev.map((tool) => tool.toolId));
				return [...prev, ...nextTools.filter((tool) => !existingIds.has(tool.toolId))];
			});

			// 최신순·인기순은 커서가 toolId 오름차순이 아니므로, 값이 바뀌었는지만 본다.
			// 커서가 그대로면 같은 페이지를 무한히 다시 부르게 되므로 끝으로 본다.
			const newCursor = scrollPaginationDto?.nextCursor ?? null;
			setNextCursor(hasValidCursor(newCursor) && newCursor !== nextCursor ? newCursor : null);
		} catch (error) {
			console.error("툴 목록 추가 조회 실패:", error);
			setNextCursor(null);
		} finally {
			setIsLoading(false);
		}
	}, [isLoading, hasMore, nextCursor, category, criteria, isFree]);

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
			observer.unobserve(sentinelEl);
		};
	}, [loadMore, hasMore]);

	if (tools.length === 0) {
		return <p className={s.emptyMessage}>해당 카테고리의 툴이 없습니다.</p>;
	}

	return (
		<>
			<div className={s.grid}>
				{tools.map((tool) => (
					<ToolCard
						key={tool.toolId}
						toolId={tool.toolId}
						title={tool.toolName}
						thumbnailUrl={tool.toolLogo}
						description={tool.description}
						priceType={LICENSE_MAP[tool.license]}
						isBookmarked={tool.isScraped}
						tags={tool.keywords}
						variant="horizontal"
						href={`/toollist/${tool.toolId}`}
					/>
				))}
			</div>

			{hasMore && (
				<div ref={sentinelRef} className={s.loadingTrigger}>
					{isLoading && <div className={s.spinner} />}
				</div>
			)}
		</>
	);
};
