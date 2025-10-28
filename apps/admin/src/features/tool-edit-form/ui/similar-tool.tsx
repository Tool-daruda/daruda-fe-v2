import { TextField } from "@repo/ui";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";
import * as S from "./tool-edit-form.css";

const SimilarTool = () => {
	return (
		<ToolEditSection title="8. 유사한 툴">
			<ToolEditField label="검색">
				<TextField type="search" placeholder="툴 이름 입력" />
			</ToolEditField>
			<ToolEditField label="유사한 툴">
				<p className={S.sectionPStyle}>선택한 툴이 없어요</p>
			</ToolEditField>
		</ToolEditSection>
	);
};

export default SimilarTool;
