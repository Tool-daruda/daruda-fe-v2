import { Button, TextArea, TextField } from "@repo/ui";
import { useEffect, useMemo } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import type { Tool } from "@/entities/tool";
import IcAdd from "@/shared/assets/icons/ic_add.svg?react";
import IcCross from "@/shared/assets/icons/ic_cross.svg?react";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";
import ErrorMessage from "./error-message";
import * as S from "./tool-edit-form.css";

const CoreFeature = () => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<Tool>();

	const { fields, append, remove, replace } = useFieldArray({
		control,
		name: "cores",
	});

	const emptyCore = useMemo(
		() => ({
			coreTitle: "",
			coreContent: "",
		}),
		[]
	);

	useEffect(() => {
		if (fields.length === 0) {
			replace([emptyCore]);
		}
	}, [fields.length, replace, emptyCore]);

	return (
		<ToolEditSection title="4. 핵심 기능">
			{fields.map((item, index) => (
				<div key={item.id} className={S.sectionGroupStyle}>
					<ToolEditField label="기능명">
						<div className={S.sectionTitleGroupStyle}>
							<Controller
								name={`cores.${index}.coreTitle`}
								control={control}
								render={({ field }) => (
									<TextField
										size="xl"
										placeholder="내용을 입력하세요"
										value={field.value}
										onChange={field.onChange}
										onClear={() => field.onChange("")}
										isError={!!errors.cores?.[index]?.coreTitle}
									/>
								)}
							/>
							<ErrorMessage>{errors.cores?.[index]?.coreTitle?.message}</ErrorMessage>
							{index === 0 ? (
								<Button
									type="button"
									intent="primary"
									size="icon"
									rounded="pill"
									appearance="filled"
									onClick={() => append(emptyCore)}
									aria-label="핵심 기능 추가"
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
									aria-label="핵심 기능 삭제"
								>
									<IcCross width={20} color="white" />
								</Button>
							)}
						</div>
					</ToolEditField>
					<ToolEditField label={`상세 설명\n(500자)`}>
						<TextArea
							placeholder="내용을 입력하세요"
							maxLength={500}
							{...register(`cores.${index}.coreContent`)}
							isError={!!errors.cores?.[index]?.coreContent}
						/>
						<ErrorMessage>{errors.cores?.[index]?.coreContent?.message}</ErrorMessage>
					</ToolEditField>
				</div>
			))}
		</ToolEditSection>
	);
};

export default CoreFeature;
