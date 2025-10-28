import { TextField } from "@repo/ui";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";

const SimilarTool = () => {
	return (
		<ToolEditSection title="8. 유사한 툴">
			<ToolEditField label="검색">
				<TextField type="search" />
			</ToolEditField>
			<ToolEditField label="유사한 툴"> absract</ToolEditField>
		</ToolEditSection>
	);
};

export default SimilarTool;
