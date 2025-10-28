import { TextArea, TextField } from "@repo/ui";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";

const Abstract = () => {
	return (
		<ToolEditSection title="1. 개요">
			<ToolEditField label="로고">
				dd
				{/* <InputImage	/> */}
			</ToolEditField>
			<ToolEditField label="툴 영문 이름">
				<TextField size="xl" placeholder="내용을 입력하세요" />
			</ToolEditField>
			<ToolEditField label="툴 한글 이름">
				<TextField size="xl" placeholder="내용을 입력하세요" />
			</ToolEditField>
			<ToolEditField label={`한 줄 소개\n(500자)`}>
				<TextArea placeholder="내용을 입력하세요" />
			</ToolEditField>
			<ToolEditField label="카테고리">
				dd
				{/* <Dropdown
					// options={dropdownOptions}
					// value={selectedValue}
					// onChange={handleDropdownChange}
					maxHeight={3}
					placeholder="내용을 입력하세요"
				/> */}
			</ToolEditField>
			<ToolEditField label="바로가기 링크">
				<TextField size="xl" placeholder="내용을 입력하세요" />
			</ToolEditField>
			<ToolEditField label="키워드">
				<TextField size="s" placeholder="내용을 입력하세요" />
			</ToolEditField>
			<ToolEditField label="등록기간"> absract</ToolEditField>
		</ToolEditSection>
	);
};

export default Abstract;
