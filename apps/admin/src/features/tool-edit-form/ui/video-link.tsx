import { TextField } from "@repo/ui";
import { Controller, useFormContext } from "react-hook-form";
import type { Tool } from "@/entities/tool";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";
import ErrorMessage from "./error-message";

const VideoLink = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext<Tool>();

	return (
		<ToolEditSection title="5. 참고하면 좋은 영상">
			{[0, 1].map((index) => (
				<ToolEditField key={index} label={`링크 ${index + 1}`}>
					<Controller
						name={`videos.${index}.videoUrl` as const}
						control={control}
						render={({ field }) => (
							<TextField
								size="xl"
								placeholder="내용을 입력하세요"
								value={field.value ?? ""}
								onChange={field.onChange}
								onClear={() => field.onChange("")}
								isError={!!errors.videos?.[index]}
							/>
						)}
					/>
					<ErrorMessage>{errors.videos?.[index]?.message}</ErrorMessage>
				</ToolEditField>
			))}
		</ToolEditSection>
	);
};

export default VideoLink;
