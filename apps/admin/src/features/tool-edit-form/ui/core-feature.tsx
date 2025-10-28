import { TextArea, TextField } from "@repo/ui";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";

const CoreFeature = () => {
	return (
		<ToolEditSection title="4. 핵심 기능">
			<ToolEditField label="기능명">
				<TextField />
			</ToolEditField>
			<ToolEditField label={`상세 설명\n(500자)`}>
				<TextArea />
			</ToolEditField>
		</ToolEditSection>
	);
};

export default CoreFeature;
