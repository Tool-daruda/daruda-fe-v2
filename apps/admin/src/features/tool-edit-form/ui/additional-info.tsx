import { Checkbox, CheckboxGroup, Radio, RadioGroup } from "@repo/ui";
import { Controller, useFormContext } from "react-hook-form";
import { LICENSE_OPTIONS, PLATFORM_OPTIONS, type Platform, type Tool } from "@/entities/tool";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";

const AdditionalInfo = () => {
	const { control } = useFormContext<Tool>();

	return (
		<ToolEditSection title="2. 부수 정보">
			<ToolEditField label="플랜">
				<Controller
					name="license"
					control={control}
					render={({ field }) => (
						<RadioGroup name={field.name} value={field.value} onValueChange={field.onChange}>
							{LICENSE_OPTIONS.map((opt) => (
								<Radio key={opt.value} value={opt.value}>
									{opt.label}
								</Radio>
							))}
						</RadioGroup>
					)}
				/>
			</ToolEditField>
			<ToolEditField label="한국어 지원">
				<Controller
					name="supportKorea"
					control={control}
					render={({ field }) => (
						<RadioGroup
							name={field.name}
							value={String(field.value)}
							onValueChange={(stringValue) => field.onChange(stringValue === "true")}
						>
							<Radio value="true">지원</Radio>
							<Radio value="false">미지원</Radio>
						</RadioGroup>
					)}
				/>
			</ToolEditField>
			<ToolEditField label="플랫폼">
				<Controller
					name="platform"
					control={control}
					defaultValue={{ supportWeb: false, supportWindows: false, supportMac: false }}
					render={({ field }) => {
						const checkedValues = PLATFORM_OPTIONS.filter(
							(opt) => field.value?.[opt.name] === true
						).map((opt) => opt.name);

						const handleChange = (newValues: string[]) => {
							const newPlatformState: Platform = {
								supportWeb: newValues.includes("supportWeb"),
								supportWindows: newValues.includes("supportWindows"),
								supportMac: newValues.includes("supportMac"),
							};
							field.onChange(newPlatformState);
						};

						return (
							<CheckboxGroup name={field.name} value={checkedValues} onValueChange={handleChange}>
								{PLATFORM_OPTIONS.map((opt) => (
									<Checkbox key={opt.name} value={opt.name}>
										{opt.label}
									</Checkbox>
								))}
							</CheckboxGroup>
						);
					}}
				/>
			</ToolEditField>
		</ToolEditSection>
	);
};

export default AdditionalInfo;
