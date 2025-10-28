import { Radio, RadioGroup, TextArea, TextField } from "@repo/ui";
import { useState } from "react";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";

const Plan = () => {
	const [selected, setSelected] = useState("ai");

	return (
		<ToolEditSection title="6. 플랜">
			<ToolEditField label="가격정책 링크">
				<TextField />
			</ToolEditField>
			<ToolEditField label="플랜 유형">
				<RadioGroup name="category" value={selected} onValueChange={setSelected}>
					<Radio value="ai">무료</Radio>
					<Radio value="doc">구매</Radio>
					<Radio value="design">월간&연간</Radio>
				</RadioGroup>
			</ToolEditField>
			<ToolEditField label="플랜명">
				<TextField />
			</ToolEditField>
			<ToolEditField label={`상세 설명\n(500자)`}>
				<TextArea />
			</ToolEditField>
			<ToolEditField label="가격(원화)">
				<TextField />
			</ToolEditField>
		</ToolEditSection>
	);
};

export default Plan;
