import { Checkbox, CheckboxGroup, Radio, RadioGroup } from "@repo/ui";
import { useState } from "react";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";

const AdditionalInfo = () => {
	const [selected, setSelected] = useState("ai");
	const [korean, setKorean] = useState("ai");
	const PLATFORM = [
		{ value: "ai", label: "Web" },
		{ value: "doc", label: "Windows" },
		{ value: "df", label: "Mac" },
	];
	const [platform, setPlatform] = useState<string[]>([]);

	return (
		<ToolEditSection title="2. 부수 정보">
			<ToolEditField label="플랜">
				<RadioGroup name="category" value={selected} onValueChange={setSelected}>
					<Radio value="ai">무료</Radio>
					<Radio value="doc">부분 유료</Radio>
					<Radio value="design">유료</Radio>
				</RadioGroup>
			</ToolEditField>
			<ToolEditField label="한국어 지원">
				<RadioGroup name="category" value={korean} onValueChange={setKorean}>
					<Radio value="ai">지원</Radio>
					<Radio value="doc">미지원</Radio>
				</RadioGroup>
			</ToolEditField>
			<ToolEditField label="플랫폼">
				<CheckboxGroup name="skills" value={platform} onValueChange={setPlatform}>
					{PLATFORM.map((o) => (
						<Checkbox key={o.value} value={o.value}>
							{o.label}
						</Checkbox>
					))}
				</CheckboxGroup>
			</ToolEditField>
		</ToolEditSection>
	);
};

export default AdditionalInfo;
