import { TextField } from "@repo/ui";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";

const VideoLink = () => {
	return (
		<ToolEditSection title="5. 참고하면 좋은 영상">
			<ToolEditField label="링크 1">
				<TextField />
			</ToolEditField>
			<ToolEditField label="링크 2">
				<TextField />
			</ToolEditField>
		</ToolEditSection>
	);
};

export default VideoLink;
