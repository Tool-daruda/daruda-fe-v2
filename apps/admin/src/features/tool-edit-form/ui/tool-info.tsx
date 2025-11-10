import { InputImage, TextArea } from "@repo/ui";
import { Controller, useFormContext } from "react-hook-form";
import type { Tool } from "@/entities/tool";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";

const ToolInfo = () => {
	const { control, register } = useFormContext<Tool>();

	return (
		<ToolEditSection title="3. 툴 소개">
			<ToolEditField label="소개 사진">
				<Controller
					name="images"
					control={control}
					render={({ field }) => {
						const existingImages = (field.value || []).filter(
							(item): item is string => typeof item === "string"
						);
						const newImages = (field.value || []).filter(
							(item): item is File => item instanceof File
						);

						return (
							<InputImage
								maxCount={3}
								existingImages={existingImages}
								newImages={newImages}
								onImageChange={(files: File[]) => field.onChange([...existingImages, ...files])}
								onDeleteExisting={(urlToDelete: string) => {
									field.onChange([
										...existingImages.filter((url) => url !== urlToDelete),
										...newImages,
									]);
								}}
								onDeleteNew={(fileToDelete: File) => {
									field.onChange([
										...existingImages,
										...newImages.filter((file) => file !== fileToDelete),
									]);
								}}
							/>
						);
					}}
				/>
			</ToolEditField>
			<ToolEditField label={`소개글\n(500자)`}>
				<TextArea
					placeholder="내용을 입력하세요"
					maxLength={500}
					{...register("detailDescription")}
				/>
			</ToolEditField>
		</ToolEditSection>
	);
};

export default ToolInfo;
