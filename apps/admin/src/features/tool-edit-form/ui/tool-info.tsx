import { TextArea } from "@repo/ui";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";

const ToolInfo = () => {
	return (
		<ToolEditSection title="3. 툴 소개">
			<ToolEditField label="소개 사진"> absract</ToolEditField>
			<ToolEditField label={`소개글\n(500자)`}>
				<TextArea />
			</ToolEditField>
		</ToolEditSection>
	);
};

export default ToolInfo;
