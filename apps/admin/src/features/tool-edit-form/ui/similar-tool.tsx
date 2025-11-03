import { TextField } from "@repo/ui";
import type React from "react";
import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import type { SearchTool, Tool } from "@/entities/tool";
import { useSearchToolQuery } from "@/entities/tool/api/queries";
import IcCross from "@/shared/assets/icons/ic_cross.svg?react";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";
import * as S from "./tool-edit-form.css";

const SimilarTool = () => {
	const [keyword, setKeyword] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

	const { control } = useFormContext<Tool>();

	const {
		field,
		fieldState: { error },
	} = useController<Tool, "relatedTools">({
		name: "relatedTools",
		control,
		rules: {
			validate: (value: SearchTool[]) => value.length === 2 || "유사한 툴은 2개를 선택해야 합니다.",
		},
	});

	const selectedTools: SearchTool[] = field.value ?? [];

	const { data: searchResults, isLoading } = useSearchToolQuery(searchQuery);

	const handleSelectTool = (tool: SearchTool) => {
		if (selectedTools.find((t) => t.toolId === tool.toolId)) return;
		if (selectedTools.length >= 2) {
			alert("유사한 툴은 2개까지만 선택할 수 있습니다.");
			return;
		}
		field.onChange([...selectedTools, tool]);
		setKeyword("");
		setSearchQuery("");
	};

	const handleRemoveTool = (toolId: number) => {
		field.onChange(selectedTools.filter((t) => t.toolId !== toolId));
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
								>
									<IcCross width={20} />
								</button>
							</li>
						))}
					</ul>
				)}
				{error && <p className={S.errorStyle}>{error.message}</p>}
			</ToolEditField>
		</ToolEditSection>
	);
};

export default SimilarTool;
