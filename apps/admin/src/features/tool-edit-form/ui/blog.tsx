import { TextField } from "@repo/ui";
import { Controller, useFormContext } from "react-hook-form";
import type { Tool } from "@/entities/tool";
import { ToolEditField, ToolEditSection } from "@/shared/ui/tool-edit-section";
import ErrorMessage from "./error-message";

const Blog = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext<Tool>();

	return (
		<ToolEditSection title="7. 블로그">
			{[0, 1, 2].map((index) => (
				<ToolEditField key={index} label={`링크 ${index + 1}`}>
					<Controller
						name={`blogLinks.${index}` as const}
						control={control}
						render={({ field }) => (
							<TextField
								size="xl"
								placeholder="내용을 입력하세요"
								value={field.value ?? ""}
								onChange={field.onChange}
								onClear={() => field.onChange("")}
								isError={!!errors.blogLinks?.[index]}
							/>
						)}
					/>
					<ErrorMessage>{errors.blogLinks?.[index]?.message}</ErrorMessage>
				</ToolEditField>
			))}
		</ToolEditSection>
	);
};

export default Blog;
