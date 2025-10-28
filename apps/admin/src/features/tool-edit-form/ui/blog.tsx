import { TextField } from "@repo/ui";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";

const Blog = () => {
	return (
		<ToolEditSection title="7. 블로그">
			<ToolEditField label="링크 1">
				<TextField />
			</ToolEditField>
			<ToolEditField label="링크 2">
				<TextField />
			</ToolEditField>
			<ToolEditField label="링크 3">
				<TextField />
			</ToolEditField>
		</ToolEditSection>
	);
};

export default Blog;
