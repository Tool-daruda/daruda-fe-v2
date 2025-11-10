import { TextField } from "@repo/ui";
import { Controller, useFormContext } from "react-hook-form";
import type { Tool } from "@/entities/tool";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";

const Blog = () => {
	const { control } = useFormContext<Tool>();

	return (
		<ToolEditSection title="7. 블로그">
			<ToolEditField label="링크 1">
				<Controller
					name="blogLinks.0"
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
					name="blogLinks.1"
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
				/>{" "}
			</ToolEditField>
			<ToolEditField label="링크 3">
				<Controller
					name="blogLinks.2"
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
				/>{" "}
			</ToolEditField>
		</ToolEditSection>
	);
};

export default Blog;
