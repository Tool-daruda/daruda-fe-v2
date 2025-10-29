import { Button } from "@repo/ui";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Form, useActionData, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
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

type ToolActionData = {
	ok: boolean;
	message?: string;
};

export const ToolEditForm = () => {
	const loaderData = useLoaderData() as { toolData?: Tool } | null;
	const toolData = loaderData?.toolData;

	const isEditMode = !!toolData;

	const methods = useForm<Tool>({
		defaultValues: toolData || {},
	});

	const navigate = useNavigate();
	const submit = useSubmit();
	const { handleSubmit } = methods;

	const actionData = useActionData() as ToolActionData | undefined;

	useEffect(() => {
		if (actionData && !actionData.ok) {
			alert(actionData.message || "저장에 실패했습니다. 다시 시도해주세요.");
		}
	}, [actionData]);

	const onFormSubmit = (intent: "draft" | "publish") => {
		handleSubmit((data: Tool) => {
			const formData = new FormData();
			formData.append("intent", intent);

			if (data.toolLogo instanceof File) {
				formData.append("toolLogo", data.toolLogo);
			}
			(data.images || []).forEach((img) => {
				if (img instanceof File) {
					formData.append("images", img);
				}
			});

			// 객체 배열 처리
			formData.append("platform", JSON.stringify(data.platform || {}));
			formData.append("keywords", JSON.stringify(data.keywords || []));
			formData.append("cores", JSON.stringify(data.cores || []));
			formData.append("plans", JSON.stringify(data.plans || []));
			formData.append("videos", JSON.stringify(data.videos || []));

			formData.append("toolMainName", data.toolMainName || "");
			formData.append("toolSubName", data.toolSubName || "");
			formData.append("category", data.category || "");
			formData.append("toolLink", data.toolLink || "");
			formData.append("description", data.description || "");
			formData.append("license", data.license || "");
			formData.append("supportKorea", String(data.supportKorea || false));
			formData.append("detailDescription", data.detailDescription || "");

			submit(formData, {
				method: isEditMode ? "put" : "post",
				encType: "multipart/form-data",
			});
		})();
	};

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
						onClick={() => onFormSubmit("draft")}
					>
						임시저장하기
					</Button>
					<Button
						type="button"
						size="lg"
						intent="primary"
						appearance="filled"
						onClick={() => onFormSubmit("publish")}
					>
						저장하기
					</Button>
				</div>
			</Form>
		</FormProvider>
	);
};
