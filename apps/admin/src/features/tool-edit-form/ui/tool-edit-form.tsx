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

// import { SectionCoreFeatures } from "./components/section-core-feature";
// import { type Tool } from "@/entities/tool/model";

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
					<Button
						size="lg"
						intent="dangerous"
						appearance="outlined"
						onClick={() => navigate("/daruda-admin/tool")}
					>
						취소하기
					</Button>
					<Button size="lg" intent="primary" appearance="outlined" value="draft">
						임시저장하기
					</Button>
					<Button type="submit" size="lg" intent="primary" appearance="filled" value="publish">
						저장하기
					</Button>
				</div>
			</Form>
		</FormProvider>
	);
};
