"use client";

import { cx } from "@repo/ui";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { CommunityFilterTool } from "../../_types";
import * as s from "./styles/post-tag-selector.css";

type TagMode = "FREE" | "TOOL";

interface PostTagSelectorProps {
	tools: CommunityFilterTool[];
	selectedTool: CommunityFilterTool | null;
	onSelectTool: (tool: CommunityFilterTool | null) => void;
}

export const PostTagSelector = ({ tools, selectedTool, onSelectTool }: PostTagSelectorProps) => {
	const [mode, setMode] = useState<TagMode>(selectedTool ? "TOOL" : "FREE");
	const [keyword, setKeyword] = useState("");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const trimmedKeyword = keyword.trim().toLowerCase();
	const filteredTools = useMemo(() => {
		if (!trimmedKeyword) return tools;
		return tools.filter((tool) => tool.toolName.toLowerCase().includes(trimmedKeyword));
	}, [tools, trimmedKeyword]);

	const handleSelectFree = () => {
		setMode("FREE");
		onSelectTool(null);
	};

	const handleSelectTool = (tool: CommunityFilterTool) => {
		onSelectTool(tool);
		setKeyword("");
		setIsDropdownOpen(false);
	};

	const handleRemoveTool = () => {
		onSelectTool(null);
	};

	return (
		<div className={s.wrapper}>
			<p className={s.label}>태그</p>

			<div className={s.radioRow}>
				<button type="button" className={s.radioOption} onClick={handleSelectFree}>
					<RadioIcon active={mode === "FREE"} />
					<span className={cx(s.radioLabel, mode === "FREE" && s.radioLabelActive)}>자유</span>
				</button>
				<button type="button" className={s.radioOption} onClick={() => setMode("TOOL")}>
					<RadioIcon active={mode === "TOOL"} />
					<span className={cx(s.radioLabel, mode === "TOOL" && s.radioLabelActive)}>툴 지정</span>
				</button>
			</div>

			{mode === "TOOL" && (
				<>
					<div className={s.searchArea}>
						<div className={s.searchInput} data-active={isDropdownOpen ? "true" : "false"}>
							<Image
								src={
									isDropdownOpen
										? "/icons/community/ic_search_iris400_20.svg"
										: "/icons/community/ic_search_gray200_20.svg"
								}
								alt=""
								width={20}
								height={20}
							/>
							<input
								type="text"
								value={keyword}
								onChange={(e) => setKeyword(e.target.value)}
								onFocus={() => setIsDropdownOpen(true)}
								onBlur={() => setIsDropdownOpen(false)}
								placeholder={isDropdownOpen ? "키워드입력" : "툴 검색"}
								className={s.searchInputField}
							/>
						</div>

						{isDropdownOpen && (
							<div className={s.dropdown}>
								{filteredTools.length === 0 ? (
									<p className={s.dropdownEmpty}>일치하는 툴이 없어요.</p>
								) : (
									filteredTools.map((tool) => (
										<button
											key={tool.toolId}
											type="button"
											className={s.dropdownItem}
											// blur보다 먼저 선택을 반영하기 위해 mousedown에서 처리합니다.
											onMouseDown={(e) => {
												e.preventDefault();
												handleSelectTool(tool);
											}}
										>
											{tool.toolLogo ? (
												<span className={s.toolLogo}>
													<Image src={tool.toolLogo} alt="" fill style={{ objectFit: "cover" }} />
												</span>
											) : (
												<span className={s.toolLogo} />
											)}
											<span className={s.dropdownItemName}>{tool.toolName}</span>
										</button>
									))
								)}
							</div>
						)}
					</div>

					{selectedTool && (
						<div className={s.chip}>
							{selectedTool.toolLogo ? (
								<span className={s.chipLogo}>
									<Image src={selectedTool.toolLogo} alt="" fill style={{ objectFit: "cover" }} />
								</span>
							) : (
								<span className={s.chipLogo} />
							)}
							<span className={s.chipName}>{selectedTool.toolName}</span>
							<button
								type="button"
								className={s.chipRemove}
								onClick={handleRemoveTool}
								aria-label={`${selectedTool.toolName} 선택 해제`}
							>
								<Image src="/icons/community/ic_cross_20.svg" alt="" width={10} height={10} />
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

const RadioIcon = ({ active }: { active: boolean }) => (
	<Image
		src={
			active
				? "/icons/community/ic_radio_24_active.svg"
				: "/icons/community/ic_radio_24_default.svg"
		}
		alt=""
		width={24}
		height={24}
	/>
);
