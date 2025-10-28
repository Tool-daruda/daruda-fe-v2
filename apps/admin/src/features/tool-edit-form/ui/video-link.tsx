import { TextField } from "@repo/ui";
import { Controller, useFormContext } from "react-hook-form";
import type { Tool } from "@/entities/tool";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";

const VideoLink = () => {
	const { control } = useFormContext<Tool>();

	return (
		<ToolEditSection title="5. 참고하면 좋은 영상">
			<ToolEditField label="링크 1">
				<Controller
					name="videos.0.videoUrl"
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
			<ToolEditField label="링크 2">
				<Controller
					name="videos.1.videoUrl"
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
		</ToolEditSection>
	);
};

export default VideoLink;
