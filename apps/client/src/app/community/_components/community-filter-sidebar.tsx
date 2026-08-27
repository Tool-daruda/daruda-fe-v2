"use client";

import { cx } from "@repo/ui";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchMoreToolListAction } from "@/common/api/actions/tool.actions";
import { LoadingSentinel } from "@/common/components/loading-spinner/loading-spinner";
import type { CommunityFilterCategory, CommunityFilterTool } from "../_types";
import * as s from "./styles/community-filter-sidebar.css";

const TOOLS_PER_CATEGORY_SIZE = 11;

const hasValidCursor = (cursor: number | null): cursor is number =>
	cursor !== null && Number.isFinite(cursor) && cursor > 0;

interface CommunityFilterSidebarProps {
	categories: CommunityFilterCategory[];
	selectedToolId?: number;
	isFreeOnly: boolean;
}

export const CommunityFilterSidebar = ({
	categories,
	selectedToolId,
	isFreeOnly,
}: CommunityFilterSidebarProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [isInfoOpen, setIsInfoOpen] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [isSearchActive, setIsSearchActive] = useState(false);
	const [activeCategory, setActiveCategory] = useState<CommunityFilterCategory | null>(null);

	const [extraToolsByCategory, setExtraToolsByCategory] = useState<
		Record<string, CommunityFilterTool[]>
	>({});
	const [cursorByCategory, setCursorByCategory] = useState<Record<string, number | null>>(() =>
		Object.fromEntries(categories.map((category) => [category.name, category.nextCursor]))
	);
	const [loadingCategoryName, setLoadingCategoryName] = useState<string | null>(null);

	const listSectionRef = useRef<HTMLDivElement>(null);
	const sentinelRef = useRef<HTMLDivElement>(null);

	const trimmedKeyword = keyword.trim().toLowerCase();
	const isSearching = trimmedKeyword.length > 0;

	const activeCategoryTools = useMemo(() => {
		if (!activeCategory) return [];
		return [...activeCategory.tools, ...(extraToolsByCategory[activeCategory.name] ?? [])];
	}, [activeCategory, extraToolsByCategory]);

	const activeCursor = activeCategory ? (cursorByCategory[activeCategory.name] ?? null) : null;
	const hasMoreActiveCategoryTools = hasValidCursor(activeCursor);

	const searchScopeTools = useMemo(
		() => (activeCategory ? activeCategoryTools : categories.flatMap((category) => category.tools)),
		[activeCategory, activeCategoryTools, categories]
	);

	const searchResultTools = useMemo(() => {
		if (!isSearching) return [];
		return searchScopeTools.filter((tool) => tool.toolName.toLowerCase().includes(trimmedKeyword));
	}, [isSearching, searchScopeTools, trimmedKeyword]);

	const selectedTool = useMemo(() => {
		if (selectedToolId === undefined) return null;
		for (const category of categories) {
			const found = category.tools.find((tool) => tool.toolId === selectedToolId);
			if (found) return found;
		}
		return null;
	}, [categories, selectedToolId]);

	const loadMoreActiveCategoryTools = useCallback(async () => {
		if (!activeCategory) return;
		const cursor = cursorByCategory[activeCategory.name] ?? null;
		if (!hasValidCursor(cursor) || loadingCategoryName === activeCategory.name) return;

		const categoryName = activeCategory.name;
		setLoadingCategoryName(categoryName);

		try {
			const res = await fetchMoreToolListAction({
				category: categoryName,
				criteria: "popular",
				isFree: false,
				lastToolId: cursor,
				size: TOOLS_PER_CATEGORY_SIZE,
			});

			if (!res.success || !res.data || res.data.tools.length === 0) {
				setCursorByCategory((prev) => ({ ...prev, [categoryName]: null }));
				return;
			}

			const { tools: nextTools, scrollPaginationDto } = res.data;

			setExtraToolsByCategory((prev) => {
				const existingIds = new Set([
					...activeCategory.tools.map((tool) => tool.toolId),
					...(prev[categoryName] ?? []).map((tool) => tool.toolId),
				]);
				const filtered = nextTools.filter((tool) => !existingIds.has(tool.toolId));
				return { ...prev, [categoryName]: [...(prev[categoryName] ?? []), ...filtered] };
			});

			// 최신순·인기순은 커서가 toolId 오름차순이 아니므로, 값이 바뀌었는지만 본다.
			const newCursor = scrollPaginationDto?.nextCursor ?? null;
			setCursorByCategory((prev) => ({
				...prev,
				[categoryName]: hasValidCursor(newCursor) && newCursor !== cursor ? newCursor : null,
			}));
		} catch (error) {
			console.error(`카테고리 툴 목록 추가 조회 실패 (${categoryName})`, error);
			setCursorByCategory((prev) => ({ ...prev, [categoryName]: null }));
		} finally {
			setLoadingCategoryName(null);
		}
	}, [activeCategory, cursorByCategory, loadingCategoryName]);

	useEffect(() => {
		const sentinelEl = sentinelRef.current;
		const rootEl = listSectionRef.current;
		if (!sentinelEl || !rootEl || !activeCategory || !hasMoreActiveCategoryTools) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) loadMoreActiveCategoryTools();
			},
			{ root: rootEl, rootMargin: "100px" }
		);
		observer.observe(sentinelEl);

		return () => observer.unobserve(sentinelEl);
	}, [activeCategory, hasMoreActiveCategoryTools, loadMoreActiveCategoryTools]);

	const updateFilterParams = (next: { toolId?: number | null; noTopic?: boolean | null }) => {
		const params = new URLSearchParams(searchParams.toString());

		if ("toolId" in next) {
			if (next.toolId == null) params.delete("toolId");
			else params.set("toolId", String(next.toolId));
		}
		if ("noTopic" in next) {
			if (!next.noTopic) params.delete("noTopic");
			else params.set("noTopic", "true");
		}

		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	const selectTool = (tool: CommunityFilterTool) => {
		if (selectedToolId === tool.toolId) {
			updateFilterParams({ toolId: null });
		} else {
			updateFilterParams({ toolId: tool.toolId, noTopic: false });
		}
	};

	const toggleFree = () => {
		updateFilterParams({ noTopic: !isFreeOnly, toolId: isFreeOnly ? undefined : null });
	};

	const handleBackToCategories = () => {
		setActiveCategory(null);
		setKeyword("");
	};

	const hasSelection = isFreeOnly || selectedTool !== null;

	return (
		<aside className={s.root}>
			<div className={s.card}>
				<div className={s.head}>
					<div className={s.titleRow}>
						<span className={s.title}>필터링 옵션</span>
						<div className={s.infoWrapper}>
							<button
								type="button"
								className={s.infoButton}
								onMouseEnter={() => setIsInfoOpen(true)}
								onMouseLeave={() => setIsInfoOpen(false)}
								onClick={() => setIsInfoOpen((prev) => !prev)}
								aria-label="필터링 옵션 설명 보기"
							>
								<Image src="/icons/community/ic_info_12.svg" alt="" width={14} height={14} />
							</button>
							{isInfoOpen && (
								<div className={s.tooltipWrapper}>
									<div className={s.tooltipTail} />
									<div className={s.tooltipBubble} role="tooltip">
										필터링을 통해 특정 툴과 관련된 글만 모아보실 수 있습니다. 아래 '검색 기능'과
										'카테고리 기능'을 활용해보세요.
									</div>
								</div>
							)}
						</div>
					</div>

					{hasSelection ? (
						<div className={s.chipList}>
							{isFreeOnly && (
								<div className={s.chip}>
									<span className={s.chipName}>자유</span>
									<button
										type="button"
										className={s.chipRemove}
										onClick={() => updateFilterParams({ noTopic: false })}
										aria-label="자유 필터 해제"
									>
										<Image src="/icons/community/ic_cross_20.svg" alt="" width={10} height={10} />
									</button>
								</div>
							)}
							{selectedTool && (
								<div className={s.chip}>
									{selectedTool.toolLogo ? (
										<span className={s.chipLogo}>
											<Image
												src={selectedTool.toolLogo}
												alt=""
												fill
												style={{ objectFit: "cover" }}
											/>
										</span>
									) : (
										<span className={s.chipLogo} />
									)}
									<span className={s.chipName}>{selectedTool.toolName}</span>
									<button
										type="button"
										className={s.chipRemove}
										onClick={() => updateFilterParams({ toolId: null })}
										aria-label={`${selectedTool.toolName} 필터 해제`}
									>
										<Image src="/icons/community/ic_cross_20.svg" alt="" width={10} height={10} />
									</button>
								</div>
							)}
						</div>
					) : (
						<span className={s.emptyLabel}>비어있음</span>
					)}
				</div>

				<div className={s.searchSection}>
					<div className={s.searchInputWrapper} data-active={isSearchActive ? "true" : "false"}>
						<Image src="/icons/community/ic_search_gray_12.svg" alt="" width={12} height={12} />
						<input
							type="text"
							value={keyword}
							onChange={(e) => setKeyword(e.target.value)}
							onFocus={() => setIsSearchActive(true)}
							onBlur={() => setIsSearchActive(false)}
							placeholder="키워드 입력"
							className={s.searchInput}
						/>
					</div>
				</div>

				<div
					className={s.listSection}
					ref={listSectionRef}
					data-capped={!isSearching && activeCategory ? "true" : "false"}
				>
					{isSearching ? (
						searchResultTools.length === 0 ? (
							<p className={s.emptyResult}>일치하는 툴이 없어요.</p>
						) : (
							searchResultTools.map((tool) => (
								<ToolRow
									key={tool.toolId}
									tool={tool}
									selected={selectedToolId === tool.toolId}
									onSelect={() => selectTool(tool)}
								/>
							))
						)
					) : activeCategory ? (
						<>
							<button type="button" className={s.categoryRow} onClick={handleBackToCategories}>
								<span className={cx(s.categoryLabel, s.categoryLabelActive)}>
									{activeCategory.koreanName}
								</span>
								<Image src="/icons/community/ic_chevron_down_14.svg" alt="" width={14} height={7} />
							</button>
							{activeCategoryTools.length === 0 ? (
								<p className={s.emptyResult}>등록된 툴이 없어요.</p>
							) : (
								activeCategoryTools.map((tool) => (
									<ToolRow
										key={tool.toolId}
										tool={tool}
										selected={selectedToolId === tool.toolId}
										onSelect={() => selectTool(tool)}
									/>
								))
							)}
							{hasMoreActiveCategoryTools && (
								<LoadingSentinel
									ref={sentinelRef}
									isLoading={loadingCategoryName === activeCategory.name}
								/>
							)}
						</>
					) : (
						<>
							<button
								type="button"
								className={s.freeRow}
								onClick={toggleFree}
								aria-pressed={isFreeOnly}
							>
								<span className={s.freeLabel}>자유</span>
								<span className={s.checkboxBox} data-checked={isFreeOnly ? "true" : "false"}>
									{isFreeOnly && <CheckIcon />}
								</span>
							</button>
							{categories.map((category) => (
								<button
									key={category.name}
									type="button"
									className={s.categoryRow}
									onClick={() => setActiveCategory(category)}
								>
									<span className={s.categoryLabel}>{category.koreanName}</span>
									<Image
										src="/icons/community/ic_chevron_right_14.svg"
										alt=""
										width={14}
										height={7}
									/>
								</button>
							))}
						</>
					)}
				</div>
			</div>
		</aside>
	);
};

interface ToolRowProps {
	tool: CommunityFilterTool;
	selected: boolean;
	onSelect: () => void;
}

const ToolRow = ({ tool, selected, onSelect }: ToolRowProps) => {
	return (
		<button type="button" className={s.toolRow} onClick={onSelect}>
			<span
				className={cx(s.toolRowInner, !selected && s.toolRowInnerHover)}
				data-selected={selected ? "true" : "false"}
			>
				{tool.toolLogo ? (
					<span className={s.toolLogo}>
						<Image src={tool.toolLogo} alt="" fill style={{ objectFit: "cover" }} />
					</span>
				) : (
					<span className={s.toolLogo} />
				)}
				<span className={s.toolName}>{tool.toolName}</span>
			</span>
		</button>
	);
};

const CheckIcon = () => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: 'Checkmark icon is decorative and does not require a title.'
	<svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M1 3.5L3.2 5.7L8 1"
			stroke="white"
			strokeWidth="1.4"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
