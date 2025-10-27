import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";

const Plan = () => {
	return (
		<ToolEditSection title="6. 플랜">
			<ToolEditField label="가격정책 링크"> absract</ToolEditField>
			<ToolEditField label="플랜 유형"> absract</ToolEditField>
			<ToolEditField label="플랜명"> absract</ToolEditField>
			<ToolEditField label={`상세 설명\n(500자)`}> absract</ToolEditField>
			<ToolEditField label="가격(원화)"> absract</ToolEditField>
		</ToolEditSection>
	);
};

export default Plan;
