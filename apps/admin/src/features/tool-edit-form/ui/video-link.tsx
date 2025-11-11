import { TextField } from "@repo/ui";
import { Controller, useFormContext } from "react-hook-form";
import type { Tool } from "@/entities/tool";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";

const VideoLink = () => {
	const { control } = useFormContext<Tool>();

	return (
		<ToolEditSection title="5. 참고하면 좋은 영상">
			{[0, 1].map((index) => (
				<ToolEditField key={index} label={`링크 ${index + 1}`}>
					<Controller
						name={`videos.${index}.videoUrl` as const}
						control={control}
						rules={{
							pattern: {
								value: /^https?:\/\/.+/,
								message: "올바른 URL 형식을 입력하세요",
							},
						}}
						render={({ field }) => (
							<TextField
								size="xl"
								placeholder="내용을 입력하세요"
								value={field.value ?? ""}
								onChange={field.onChange}
								onClear={() => field.onChange("")}
							/>
						)}
					/>
				</ToolEditField>
			))}
		</ToolEditSection>
	);
};

export default VideoLink;
