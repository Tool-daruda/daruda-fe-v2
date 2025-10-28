import { Button, Radio, RadioGroup, TextArea, TextField } from "@repo/ui";
import { useEffect, useMemo } from "react";
import { Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { PLAN_TYPE_OPTIONS, type Tool } from "@/entities/tool";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";
import * as S from "./tool-edit-form.css";

const Plan = () => {
	const { register, control, setValue } = useFormContext<Tool>();

	const plantype = useWatch({ control, name: "plantype" });

	const { fields, append, remove, replace } = useFieldArray({
		control,
		name: "plans",
	});

	const emptyPlan = useMemo(
		() => ({
			planName: "",
			description: "",
			priceMonthly: null as number | null,
			priceAnnual: null as number | null,
			isDollar: false,
		}),
		[]
	);

	useEffect(() => {
		if (plantype === "free") {
			if (fields.length > 0) replace([]);
			return;
		}

		if (fields.length === 0) {
			replace([emptyPlan]);
		}
	}, [plantype, fields.length, replace, emptyPlan]);

	return (
		<ToolEditSection title="6. 플랜">
			<ToolEditField label="가격정책 링크">
				<Controller
					name="planLink"
					control={control}
					render={({ field }) => (
						<TextField
							size="xl"
							placeholder="내용을 입력하세요"
							value={field.value}
							onChange={field.onChange}
							onClear={() => field.onChange("")}
						/>
					)}
				/>
			</ToolEditField>

			<ToolEditField label="플랜 유형">
				<Controller
					name="plantype"
					control={control}
					render={({ field }) => (
						<RadioGroup
							name={field.name}
							value={field.value ?? ""}
							onValueChange={(newValue) => field.onChange(newValue)}
						>
							{PLAN_TYPE_OPTIONS.map((opt) => (
								<Radio key={opt.value} value={opt.value}>
									{opt.label}
								</Radio>
							))}
						</RadioGroup>
					)}
				/>
			</ToolEditField>

			{plantype !== "free" &&
				fields.map((item, index) => (
					<div key={item.id} className={S.sectionGroupStyle}>
						<div className={S.hrStyle} />
						<ToolEditField label="플랜명">
							<div className={S.sectionTitleGroupStyle}>
								<Controller
									name={`plans.${index}.planName`}
									control={control}
									render={({ field }) => (
										<TextField
											placeholder="내용을 입력하세요"
											value={field.value}
											onChange={field.onChange}
											onClear={() => field.onChange("")}
										/>
									)}
								/>
								{index === 0 ? (
									<Button
										type="button"
										intent="primary"
										appearance="filled"
										onClick={() => append(emptyPlan)}
									>
										+
									</Button>
								) : (
									<Button
										type="button"
										intent="dangerous"
										appearance="filled"
										onClick={() => remove(index)}
									>
										x
									</Button>
								)}
							</div>
						</ToolEditField>

						<ToolEditField label={`상세 설명\n(500자)`}>
							<TextArea
								placeholder="내용을 입력하세요"
								{...register(`plans.${index}.description`)}
							/>
						</ToolEditField>

						<ToolEditField label="가격(원화)">
							<Controller
								name={`plans.${index}.priceMonthly`}
								control={control}
								render={({ field }) => (
									<TextField
										placeholder="내용을 입력하세요"
										value={field.value ?? ""}
										onChange={(e) => {
											const rawValue = e.target.value;
											const monthlyPrice = rawValue === "" ? null : Number(rawValue);
											field.onChange(monthlyPrice);
											setValue(
												`plans.${index}.priceAnnual`,
												monthlyPrice === null ? null : monthlyPrice * 12
											);
											setValue(`plans.${index}.isDollar`, false);
										}}
										onClear={() => field.onChange("")}
									/>
								)}
							/>
						</ToolEditField>
					</div>
				))}
		</ToolEditSection>
	);
};

export default Plan;
