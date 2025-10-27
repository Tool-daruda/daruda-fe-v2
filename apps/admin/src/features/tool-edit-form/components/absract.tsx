import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";

const Abstract = () => {
	return (
		<ToolEditSection title="1. 개요">
			<ToolEditField label="로고"> absract</ToolEditField>
			<ToolEditField label="툴 영문 이름"> absract</ToolEditField>
			<ToolEditField label="툴 한글 이름"> absract</ToolEditField>
			<ToolEditField label={`한 줄 소개\n(500자)`}> absract</ToolEditField>
			<ToolEditField label="카테고리"> absract</ToolEditField>
			<ToolEditField label="바로가기 링크"> absract</ToolEditField>
			<ToolEditField label="키워드"> absract</ToolEditField>
			<ToolEditField label="등록기간"> absract</ToolEditField>
		</ToolEditSection>
	);
};

export default Abstract;
