import { Button, Dropdown, InputImage, TextArea, TextField } from "@repo/ui";
import { useEffect, useMemo } from "react";
import { Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { TOOL_CATEGORY_OPTIONS, type Tool } from "@/entities/tool";
import IcAdd from "@/shared/assets/icons/ic_add.svg?react";
import { formatDateToYYYYMMDD } from "@/shared/lib/date";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";
import * as S from "./tool-edit-form.css";

const Abstract = () => {
	const { register, control } = useFormContext<Tool>();

	const updatedAt = useWatch({
		control,
		name: "updatedAt",
	});

	const today = useMemo(() => formatDateToYYYYMMDD(new Date()), []);
	const displayDate = updatedAt ? formatDateToYYYYMMDD(updatedAt) : today;

	const { fields, append, remove, replace } = useFieldArray({
		control,
		name: "keywords",
	});

	const emptyKeyword = useMemo(
		() => ({
			value: "",
		}),
		[]
	);

	useEffect(() => {
		if (fields.length === 0) {
			replace([emptyKeyword]);
		}
	}, [fields.length, replace, emptyKeyword]);

	return (
		<ToolEditSection title="1. 개요">
			<ToolEditField label="로고">
				<Controller
					name="toolLogo"
					control={control}
					render={({ field }) => {
						const existingImages = typeof field.value === "string" ? [field.value] : [];
						const newImages = field.value instanceof File ? [field.value] : [];
						return (
							<InputImage
								maxCount={1}
								existingImages={existingImages}
								newImages={newImages}
								onImageChange={(files: File[]) => field.onChange(files[0] || null)}
								onDeleteExisting={() => field.onChange(null)}
								onDeleteNew={() => field.onChange(null)}
							/>
						);
					}}
				/>
			</ToolEditField>
			<ToolEditField label="툴 영문 이름">
				<Controller
					name="toolMainName"
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
			<ToolEditField label="툴 한글 이름">
				<Controller
					name="toolSubName"
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
			<ToolEditField label={`한 줄 소개\n(500자)`}>
				<TextArea placeholder="내용을 입력하세요" {...register("description")} />
			</ToolEditField>
			<ToolEditField label="카테고리">
				<Controller
					name="category"
					control={control}
					render={({ field }) => (
						<div style={{ width: "424px" }}>
							<Dropdown
								options={TOOL_CATEGORY_OPTIONS}
								value={field.value}
								onChange={(option) => field.onChange(option.value)}
								placeholder="카테고리 선택하기"
							/>
						</div>
					)}
				/>
			</ToolEditField>
			<ToolEditField label="바로가기 링크">
				<Controller
					name="toolLink"
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
			<ToolEditField label="키워드">
				<div style={{ display: "flex", gap: "8px" }}>
					{fields.map((item, index) => (
						<div key={item.id}>
							<Controller
								name={`keywords.${index}.value`}
								control={control}
								render={({ field }) => (
									<TextField
										size="s"
										placeholder="내용을 입력하세요"
										value={field.value}
										onChange={field.onChange}
										onClear={() => (fields.length === 1 ? field.onChange("") : remove(index))}
									/>
								)}
							/>
						</div>
					))}

					{fields.length < 3 && (
						<Button
							type="button"
							size="icon"
							rounded="pill"
							intent="primary"
							appearance="filled"
							onClick={() => append(emptyKeyword)}
							disabled={fields.length >= 3}
						>
							<IcAdd width={20} color="white" />
						</Button>
					)}
				</div>
			</ToolEditField>
			<ToolEditField label="등록기간">
				<p className={S.sectionPStyle}>{displayDate}</p>
			</ToolEditField>
		</ToolEditSection>
	);
};

export default Abstract;
