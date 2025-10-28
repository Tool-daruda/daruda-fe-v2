import { Button } from "@repo/ui";
import { FormProvider, useForm } from "react-hook-form";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import type { Tool } from "@/entities/tool";
import Abstract from "./absract";
import AdditionalInfo from "./additional-info";
import Blog from "./blog";
import CoreFeature from "./core-feature";
import Plan from "./plan";
import SimilarTool from "./similar-tool";
import * as S from "./tool-edit-form.css";
import ToolInfo from "./tool-info";
import VideoLink from "./video-link";

export const ToolEditForm = () => {
	const loaderData = useLoaderData() as { toolData?: Tool } | null;
	const toolData = loaderData?.toolData;

	const isEditMode = !!toolData;

	const methods = useForm<Tool>({
		defaultValues: toolData || {},
	});

	const navigate = useNavigate();
	// const submit = useSubmit();
	// const { handleSubmit } = methods;

	// const onFormSubmit = (intent: "draft" | "publish") => {
	// 	handleSubmit((data: Tool) => {
	// 		submit(
	// 			// { ...data, intent },
	// 			{
	// 				method: isEditMode ? "put" : "post",
	// 				encType: "application/json",
	// 			}
	// 		);
	// 	})();
	// };

	return (
		<FormProvider {...methods}>
			<Form>
				<h1>{isEditMode ? "툴 수정하기" : "툴 추가하기"}</h1>
				<article className={S.sectionStyle}>
					<Abstract />
					<AdditionalInfo />
					<ToolInfo />
					<CoreFeature />
					<VideoLink />
					<Plan />
					<Blog />
					<SimilarTool />
				</article>
				<div className={S.buttonGroupStyle}>
					<Button
						type="button"
						size="lg"
						intent="dangerous"
						appearance="outlined"
						onClick={() => navigate("/daruda-admin/tool")}
					>
						취소하기
					</Button>
					<Button
						type="button"
						size="lg"
						intent="primary"
						appearance="outlined"
						// onClick={() => onFormSubmit("draft")}
					>
						임시저장하기
					</Button>
					<Button
						type="button"
						size="lg"
						intent="primary"
						appearance="filled"
						// onClick={() => onFormSubmit("publish")}
					>
						저장하기
					</Button>
				</div>
			</Form>
		</FormProvider>
	);
};
