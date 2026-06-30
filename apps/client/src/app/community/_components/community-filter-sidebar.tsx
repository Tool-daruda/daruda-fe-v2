"use client";

import { cx } from "@repo/ui";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { CommunityFilterCategory, CommunityFilterTool } from "../_types";
import * as s from "./styles/community-filter-sidebar.css";

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

	const trimmedKeyword = keyword.trim().toLowerCase();
	const isSearching = trimmedKeyword.length > 0;

	const searchScopeTools = useMemo(
		() =>
			activeCategory ? activeCategory.tools : categories.flatMap((category) => category.tools),
		[activeCategory, categories]
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

				<div className={s.listSection}>
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
							{activeCategory.tools.length === 0 ? (
								<p className={s.emptyResult}>등록된 툴이 없어요.</p>
							) : (
								activeCategory.tools.map((tool) => (
									<ToolRow
										key={tool.toolId}
										tool={tool}
										selected={selectedToolId === tool.toolId}
										onSelect={() => selectTool(tool)}
									/>
								))
							)}
						</>
					) : (
						<>
							<button type="button" className={s.freeRow} onClick={toggleFree}>
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
