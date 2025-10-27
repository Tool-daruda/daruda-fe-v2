import { FormProvider, useForm } from "react-hook-form";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import Abstract from "./components/absract";
import AdditionalInfo from "./components/additional-info";
import Blog from "./components/blog";
import CoreFeature from "./components/core-feature";
import Plan from "./components/plan";
import SimilarTool from "./components/similar-tool";
import ToolInfo from "./components/tool-info";
import VideoLink from "./components/video-link";
import * as S from "./tool-edit-form.css";

// import { SectionCoreFeatures } from "./components/section-core-feature";
// import { type Tool } from "@/entities/tool/model";

type Tool = { id: string; name: string };

export const ToolEditForm = () => {
	const loaderData = useLoaderData() as { toolData?: Tool } | null;
	const toolData = loaderData?.toolData;

	const isEditMode = !!toolData;

	const methods = useForm<Tool>({
		defaultValues: toolData || {},
	});

	const navigate = useNavigate();

	return (
		<FormProvider {...methods}>
			<Form method={isEditMode ? "put" : "post"}>
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
					<button type="button" onClick={() => navigate("/daruda-admin/tool")}>
						취소하기
					</button>
					<button type="submit" name="intent" value="draft">
						임시저장하기
					</button>
					<button type="submit" name="intent" value="publish">
						저장하기
					</button>
				</div>
			</Form>
		</FormProvider>
	);
};
