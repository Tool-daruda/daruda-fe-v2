import { TextField } from "@repo/ui";
import type React from "react";
import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import type { SearchTool, Tool } from "@/entities/tool";
import { useSearchToolQuery } from "@/entities/tool/api/queries";
import IcCross from "@/shared/assets/icons/ic_cross.svg?react";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";
import ErrorMessage from "./error-message";
import * as S from "./tool-edit-form.css";

const SimilarTool = () => {
	const [keyword, setKeyword] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

	const {
		control,
		setValue,
		formState: { errors },
	} = useFormContext<Tool>();

	const { field } = useController<Tool, "relatedTools">({
		name: "relatedTools",
		control,
	});

	const selectedTools: SearchTool[] = field.value ?? [];

	const { data: searchResults, isLoading } = useSearchToolQuery(searchQuery);

	const handleSelectTool = (tool: SearchTool) => {
		if (selectedTools.find((t) => t.toolId === tool.toolId)) return;
		if (selectedTools.length >= 2) {
			alert("유사한 툴은 2개까지만 선택할 수 있습니다.");
			return;
		}

		const newTools = [...selectedTools, tool];
		field.onChange(newTools);
		setValue(
			"relatedToolIds",
			newTools.map((t) => Number(t.toolId))
		);

		setKeyword("");
		setSearchQuery("");
	};

	const handleRemoveTool = (toolId: number) => {
		const newTools = selectedTools.filter((t) => t.toolId !== toolId);
		field.onChange(newTools);
		setValue(
			"relatedToolIds",
			newTools.map((t) => Number(t.toolId))
		);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			setSearchQuery(keyword);
		}
	};

	return (
		<ToolEditSection title="8. 유사한 툴">
			<ToolEditField label="검색">
				<div>
					<TextField
						type="search"
						placeholder="툴 이름 입력 후 Enter"
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
						onClear={() => {
							setKeyword("");
							setSearchQuery("");
						}}
						onKeyDown={handleKeyDown}
					/>
					{isLoading && <div className={S.loadingStyle}>검색 중...</div>}
					{searchResults && searchResults.length > 0 && (
						<ul className={S.searchResultsListStyle}>
							{searchResults.map((tool) => (
								<li
									key={tool.toolId}
									onClick={() => handleSelectTool(tool)}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") handleSelectTool(tool);
									}}
								>
									{tool.toolName}
								</li>
							))}
						</ul>
					)}
				</div>
			</ToolEditField>

			<ToolEditField label="유사한 툴">
				{selectedTools.length === 0 ? (
					<p className={S.sectionPStyle}>선택한 툴이 없어요</p>
				) : (
					<ul className={S.selectedToolsUlStyle}>
						{selectedTools.map((tool) => (
							<li key={tool.toolId} className={S.selectedToolsLiStyle}>
								{tool.toolName}
								<button
									type="button"
									className={S.selectedToolsBtnStyle}
									onClick={() => handleRemoveTool(tool.toolId)}
									aria-label={`${tool.toolName} 제거`}
								>
									<IcCross width={20} />
								</button>
							</li>
						))}
					</ul>
				)}
				<ErrorMessage>{errors.relatedToolIds?.message}</ErrorMessage>
			</ToolEditField>
		</ToolEditSection>
	);
};

export default SimilarTool;
