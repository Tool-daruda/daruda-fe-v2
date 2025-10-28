import { TextField } from "@repo/ui";
// import { useFormContext } from "react-hook-form";
// import type { Tool } from "@/entities/tool";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";

const Blog = () => {
	// const { register } = useFormContext<Tool>();

	return (
		<ToolEditSection title="7. 블로그">
			<ToolEditField label="링크 1">
				<TextField size="xl" placeholder="내용을 입력하세요" />
			</ToolEditField>
			<ToolEditField label="링크 2">
				<TextField size="xl" placeholder="내용을 입력하세요" />
			</ToolEditField>
			<ToolEditField label="링크 3">
				<TextField size="xl" placeholder="내용을 입력하세요" />
			</ToolEditField>
		</ToolEditSection>
	);
};

export default Blog;
