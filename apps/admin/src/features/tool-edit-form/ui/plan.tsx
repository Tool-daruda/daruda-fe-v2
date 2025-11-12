import { Button, Radio, RadioGroup, TextArea, TextField } from "@repo/ui";
import { useEffect, useMemo } from "react";
import { Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { PLAN_TYPE_OPTIONS, type Tool } from "@/entities/tool";
import IcAdd from "@/shared/assets/icons/ic_add.svg?react";
import IcCross from "@/shared/assets/icons/ic_cross.svg?react";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";
import ErrorMessage from "./error-message";
import * as S from "./tool-edit-form.css";

const Plan = () => {
	const {
		register,
		control,
		setValue,
		formState: { errors },
	} = useFormContext<Tool>();

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
		if (plantype === "무료") {
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
							isError={!!errors.planLink}
						/>
					)}
				/>
				<ErrorMessage>{errors?.planLink?.message}</ErrorMessage>
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
								<Radio key={opt.value} value={opt.label}>
									{opt.label}
								</Radio>
							))}
						</RadioGroup>
					)}
				/>
				<ErrorMessage>{errors.plantype?.message}</ErrorMessage>
			</ToolEditField>

			{plantype !== "무료" &&
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
											isError={!!errors.plans?.[index]?.planName}
										/>
									)}
								/>
								<ErrorMessage>{errors?.plans?.[index]?.planName?.message}</ErrorMessage>
								{index === 0 ? (
									<Button
										type="button"
										intent="primary"
										size="icon"
										rounded="pill"
										appearance="filled"
										onClick={() => append(emptyPlan)}
									>
										<IcAdd width={20} color="white" />
									</Button>
								) : (
									<Button
										type="button"
										intent="dangerous"
										size="icon"
										rounded="pill"
										appearance="filled"
										onClick={() => remove(index)}
									>
										<IcCross width={20} color="white" />
									</Button>
								)}
							</div>
						</ToolEditField>

						<ToolEditField label={`상세 설명\n(500자)`}>
							<TextArea
								placeholder="내용을 입력하세요"
								{...register(`plans.${index}.description`)}
								isError={!!errors.plans?.[index]?.description}
							/>
							<ErrorMessage>{errors?.plans?.[index]?.description?.message}</ErrorMessage>
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
											const raw = e.target.value;
											if (raw === "") {
												field.onChange(null); // 폼에서는 null 허용
												return;
											}
											const n = Number(raw.replaceAll(",", ""));
											if (Number.isNaN(n)) return;
											field.onChange(n); // 숫자로 유지
										}}
										onClear={() => field.onChange(null)}
										isError={!!errors.plans?.[index]?.priceMonthly}
									/>
								)}
							/>
							<ErrorMessage>{errors?.plans?.[index]?.priceMonthly?.message}</ErrorMessage>
						</ToolEditField>
					</div>
				))}
		</ToolEditSection>
	);
};

export default Plan;
