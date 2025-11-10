import { Button } from "@repo/ui";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import {
	Form,
	useActionData,
	useLoaderData,
	useNavigate,
	useParams,
	useSubmit,
} from "react-router-dom";
import type { Tool } from "@/entities/tool";
import { useToolDeleteMutation } from "@/entities/tool/api/queries";
import { DraftStorage } from "@/shared/lib/draft-storage";
import Abstract from "./absract";
import AdditionalInfo from "./additional-info";
import Blog from "./blog";
import CoreFeature from "./core-feature";
import { DraftNotification } from "./draft-notification";
import Plan from "./plan";
import SimilarTool from "./similar-tool";
import * as S from "./tool-edit-form.css";
import ToolInfo from "./tool-info";
import VideoLink from "./video-link";

type LoaderData = {
	toolData?: Tool;
	hasDraft?: boolean;
	draftTimestamp?: number | null;
	draftId?: string;
};

type ToolActionData = {
	ok: boolean;
	isDraft?: boolean;
	message?: string;
};

const FormContent = () => {
	const loaderData = useLoaderData() as LoaderData | null;
	const { toolData, hasDraft, draftTimestamp, draftId } = loaderData || {};
	const { toolId } = useParams();
	const isEditMode = !!toolId && toolId !== "new";
	const [showDraftNotification, setShowDraftNotification] = useState(false);

	const navigate = useNavigate();
	const submit = useSubmit();
	const { handleSubmit, reset, getValues } = useFormContext<Tool>();
	const actionData = useActionData() as ToolActionData | undefined;
	const { mutate: deleteMutate } = useToolDeleteMutation();

	useEffect(() => {
		if (hasDraft && draftTimestamp) {
			setShowDraftNotification(true);
		}
	}, [hasDraft, draftTimestamp]);

	useEffect(() => {
		if (actionData?.ok && actionData?.isDraft) {
			alert(actionData.message || "임시저장되었습니다.");
		} else if (actionData && !actionData.ok) {
			alert(actionData.message || "저장에 실패했습니다. 다시 시도해주세요.");
		}
	}, [actionData]);

	const handleRestoreDraft = () => {
		const draftData = DraftStorage.loadDraft(draftId);
		if (draftData && toolData) {
			const mergedData = DraftStorage.mergeDraftWithServerData(toolData, draftData);
			reset(mergedData);
		} else if (draftData) {
			reset(draftData);
		}
		setShowDraftNotification(false);
	};

	const handleDiscardDraft = () => {
		if (!draftId) return;
		DraftStorage.clearDraft(draftId);
		setShowDraftNotification(false);
	};

	const handleSaveDraft = async () => {
		if (!draftId) return;
		try {
			const currentFormData = getValues();
			await DraftStorage.saveDraft(currentFormData, draftId);
			alert("임시저장되었습니다.");
		} catch (error) {
			console.error("임시저장 실패:", error);
			alert("임시저장에 실패했습니다. 다시 시도해주세요.");
		}
	};

	const onFormSubmit = () => {
		handleSubmit((data: Tool) => {
			const formData = new FormData();
			formData.append("intent", "publish");

			if (data.toolLogo instanceof File) {
				formData.append("toolLogo", data.toolLogo);
			}
			(data.images || []).forEach((img, index) => {
				if (img instanceof File) {
					formData.append("images", img);
				} else if (img && typeof img === "string") {
					// 기존 이미지 URL 유지
					formData.append(`existingImages[${index}]`, img);
				}
			});

			const relatedToolIds = (data.relatedToolIds || []).map((id) =>
				typeof id === "string" ? Number(id) : id
			);

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
			formData.append("planLink", data.planLink || "");
			formData.append("plantype", data.plantype || "");
			formData.append("supportKorea", String(data.supportKorea || false));
			formData.append("detailDescription", data.detailDescription || "");
			formData.append("blogLinks", JSON.stringify(data.blogLinks || []));
			formData.append("relatedToolIds", JSON.stringify(relatedToolIds));

			submit(formData, {
				method: isEditMode ? "put" : "post",
				encType: "multipart/form-data",
			});
		})();
	};

	return (
		<Form>
			<h1>{isEditMode ? "툴 수정하기" : "툴 추가하기"}</h1>

			{showDraftNotification && draftTimestamp && (
				<DraftNotification
					timestamp={draftTimestamp}
					onRestore={handleRestoreDraft}
					onDiscard={handleDiscardDraft}
				/>
			)}

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
				{isEditMode ? (
					<Button
						type="button"
						size="lg"
						intent="dangerous"
						appearance="outlined"
						onClick={() => {
							if (confirm("정말 이 툴을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
								deleteMutate(Number(toolId));
							}
						}}
					>
						삭제하기
					</Button>
				) : (
					<Button
						type="button"
						size="lg"
						intent="dangerous"
						appearance="outlined"
						onClick={() => navigate("/tool")}
					>
						취소하기
					</Button>
				)}
				<Button
					type="button"
					size="lg"
					intent="primary"
					appearance="outlined"
					onClick={handleSaveDraft}
				>
					임시저장하기
				</Button>
				<Button type="button" size="lg" intent="primary" appearance="filled" onClick={onFormSubmit}>
					저장하기
				</Button>
			</div>
		</Form>
	);
};

const EMPTY_TOOL: Tool = {
	toolMainName: "",
	toolSubName: "",
	description: "",
	category: "",
	toolLink: "",
	license: "",
	supportKorea: null,
	detailDescription: "",

	platform: { supportWeb: false, supportWindows: false, supportMac: false },
	keywords: [{ value: "" }],
	cores: [{ coreTitle: "", coreContent: "" }],
	plans: [],
	videos: [],
	images: [],

	toolLogo: null,
	planLink: "",
	relatedToolIds: [],
	relatedTools: [],
	plantype: "",
	blogLinks: ["", "", ""],
};

export const ToolEditForm = () => {
	const loaderData = useLoaderData() as LoaderData | null;
	const { toolData } = loaderData || {};

	const methods = useForm<Tool>({
		defaultValues: EMPTY_TOOL,
	});
	const { reset } = methods;

	useEffect(() => {
		if (toolData && Object.keys(toolData).length > 0) {
			reset({ ...EMPTY_TOOL, ...toolData });
		} else {
			reset(EMPTY_TOOL);
		}
	}, [toolData, reset]);

	return (
		<FormProvider {...methods}>
			<FormContent />
		</FormProvider>
	);
};
