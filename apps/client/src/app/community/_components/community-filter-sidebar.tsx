"use client";

import { cx } from "@repo/ui";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { CommunityFilterCategory, CommunityFilterTool } from "../_types";
import * as s from "./styles/community-filter-sidebar.css";

interface CommunityFilterSidebarProps {
	categories: CommunityFilterCategory[];
}

export const CommunityFilterSidebar = ({ categories }: CommunityFilterSidebarProps) => {
	const [isInfoOpen, setIsInfoOpen] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [isSearchActive, setIsSearchActive] = useState(false);
	const [activeCategory, setActiveCategory] = useState<CommunityFilterCategory | null>(null);
	const [isFreeOnly, setIsFreeOnly] = useState(false);
	const [selectedTools, setSelectedTools] = useState<CommunityFilterTool[]>([]);

	const trimmedKeyword = keyword.trim().toLowerCase();
	const isSearching = trimmedKeyword.length > 0;

	// TODO(api): 키워드 검색은 현재 로컬 목데이터 기준으로 동작합니다. 다음 스텝에서 툴 검색 API로 교체됩니다.
	const searchScopeTools = useMemo(
		() =>
			activeCategory ? activeCategory.tools : categories.flatMap((category) => category.tools),
		[activeCategory, categories]
	);

	const searchResultTools = useMemo(() => {
		if (!isSearching) return [];
		return searchScopeTools.filter((tool) => tool.toolName.toLowerCase().includes(trimmedKeyword));
	}, [isSearching, searchScopeTools, trimmedKeyword]);

	const selectedToolIds = useMemo(
		() => new Set(selectedTools.map((tool) => tool.toolId)),
		[selectedTools]
	);

	const toggleTool = (tool: CommunityFilterTool) => {
		setSelectedTools((prev) =>
			prev.some((item) => item.toolId === tool.toolId)
				? prev.filter((item) => item.toolId !== tool.toolId)
				: [...prev, tool]
		);
	};

	const removeTool = (toolId: number) => {
		setSelectedTools((prev) => prev.filter((tool) => tool.toolId !== toolId));
	};

	const handleBackToCategories = () => {
		setActiveCategory(null);
		setKeyword("");
	};

	const hasSelection = isFreeOnly || selectedTools.length > 0;

	return (
		<aside className={s.root}>
			<div className={s.card}>
				<div className={s.head}>
					<div className={s.titleRow}>
						<span className={s.title}>필터링 옵션</span>
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
							<div className={s.tooltip} role="tooltip">
								필터링을 통해 특정 툴과 관련된 글만 모아보실 수 있습니다. 아래 '검색 기능'과
								'카테고리 기능'을 활용해보세요.
							</div>
						)}
					</div>

					{hasSelection ? (
						<div className={s.chipList}>
							{isFreeOnly && (
								<span className={s.chip}>
									자유
									<button
										type="button"
										className={s.chipRemove}
										onClick={() => setIsFreeOnly(false)}
										aria-label="자유 필터 해제"
									>
										×
									</button>
								</span>
							)}
							{selectedTools.map((tool) => (
								<span key={tool.toolId} className={s.chip}>
									{tool.toolName}
									<button
										type="button"
										className={s.chipRemove}
										onClick={() => removeTool(tool.toolId)}
										aria-label={`${tool.toolName} 필터 해제`}
									>
										×
									</button>
								</span>
							))}
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
									selected={selectedToolIds.has(tool.toolId)}
									onToggle={() => toggleTool(tool)}
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
							{activeCategory.tools.map((tool) => (
								<ToolRow
									key={tool.toolId}
									tool={tool}
									selected={selectedToolIds.has(tool.toolId)}
									onToggle={() => toggleTool(tool)}
								/>
							))}
						</>
					) : (
						<>
							<button
								type="button"
								className={s.freeRow}
								onClick={() => setIsFreeOnly((prev) => !prev)}
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
	onToggle: () => void;
}

const ToolRow = ({ tool, selected, onToggle }: ToolRowProps) => {
	return (
		<button type="button" className={s.toolRow} onClick={onToggle}>
			<span
				className={cx(s.toolRowInner, !selected && s.toolRowInnerHover)}
				data-selected={selected ? "true" : "false"}
			>
				<span className={s.toolLogo} />
				<span className={s.toolName}>{tool.toolName}</span>
			</span>
			<span className={s.checkboxBox} data-checked={selected ? "true" : "false"}>
				{selected && <CheckIcon />}
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
