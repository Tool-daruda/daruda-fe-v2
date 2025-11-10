import { isAxiosError } from "axios";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import {
	getAlternativeTool,
	getBlog,
	getCoreFeature,
	getDetail,
	getPlan,
	LICENSE_OPTIONS,
	type Plan,
	patchTool,
	type Tool,
} from "@/entities/tool";
import { transformToCreateRequest } from "@/entities/tool/model/transform";
import { ToolEditForm } from "@/features/tool-edit-form";
import { DraftStorage } from "@/shared/lib/draft-storage";
import { uploadFileAndGetUrl } from "@/shared/lib/file-uploader";

export async function loader({ params }: LoaderFunctionArgs) {
	const { toolId } = params;

	if (!toolId || toolId === "new") {
		const hasDraft = DraftStorage.hasDraft("new");
		const draftTimestamp = DraftStorage.getDraftTimestamp("new");

		return {
			toolData: {},
			hasDraft,
			draftTimestamp,
			draftId: "new",
		};
	}

	try {
		const numericToolId = Number(toolId);

		const [detailData, coreFeatureData, planData, alternativeToolData, blogData] =
			await Promise.all([
				getDetail(numericToolId),
				getCoreFeature(numericToolId),
				getPlan(numericToolId),
				getAlternativeTool(numericToolId),
				getBlog(numericToolId),
			]);

		let mappedPlans = [] as Plan[];

		if (detailData?.license && detailData?.license !== LICENSE_OPTIONS[0].label) {
			mappedPlans = (planData?.toolPlans || []).map((apiPlan) => ({
				planName: apiPlan.planName,
				description: apiPlan.description,
				priceMonthly: apiPlan.monthlyPrice,
				priceAnnual: apiPlan.annualPrice,
				isDollar: apiPlan.isDollar,
			}));
		}

		let calculatedPlanType: string;
		const hasMonthly = planData?.toolPlans.some((plan) => plan.monthlyPrice !== null);
		const hasAnnual = planData?.toolPlans.some((plan) => plan.annualPrice !== null);

		if (hasMonthly && hasAnnual) {
			calculatedPlanType = "subscription";
		} else if (hasMonthly) {
			calculatedPlanType = "monthly";
		} else if (hasAnnual) {
			calculatedPlanType = "subscription";
		} else {
			calculatedPlanType = "free";
		}

		const apiBlogs = (blogData?.toolBlogs || []).map((blog: { blogUrl: string }) => blog.blogUrl);
		const formBlogs = [apiBlogs[0] || "", apiBlogs[1] || "", apiBlogs[2] || ""];

		const combinedToolData: Partial<Tool> = {
			...detailData,
			cores: coreFeatureData?.toolCoreResList || [],
			plantype: calculatedPlanType,
			plans: mappedPlans,
			relatedTools: alternativeToolData?.relatedToolResList || [],
			relatedToolIds: alternativeToolData?.relatedToolResList.map((tool) => tool.toolId),
			keywords: (detailData?.keywords || []).map((val: string) => ({
				value: val,
			})),
			videos: (detailData?.videos || []).map((val: string) => ({
				videoUrl: val,
			})),
			license: LICENSE_OPTIONS.find((option) => option.label === detailData?.license)?.value,
			platform: {
				supportWeb: detailData?.platform[0].Web ?? false,
				supportWindows: detailData?.platform[0].Windows ?? false,
				supportMac: detailData?.platform[0].Mac ?? false,
			},
			blogLinks: formBlogs,
		};

		const hasDraft = DraftStorage.hasDraft(toolId);
		const draftTimestamp = DraftStorage.getDraftTimestamp(toolId);

		return {
			toolData: combinedToolData,
			hasDraft,
			draftTimestamp,
			draftId: toolId,
		};
	} catch (error) {
		console.error("툴 데이터 로딩 실패:", error);
		throw new Response("Tool Not Found", { status: 404 });
	}
}

async function handleFileUploads(toolData: Tool): Promise<Tool> {
	const toolLogoUrl =
		toolData.toolLogo instanceof File
			? await uploadFileAndGetUrl(toolData.toolLogo)
			: toolData.toolLogo;

	const imageUrls = await Promise.all(
		(toolData.images || []).map(async (img) => {
			if (img instanceof File) {
				return uploadFileAndGetUrl(img);
			}
			return img;
		})
	);

	return {
		...toolData,
		toolLogo: toolLogoUrl,
		images: imageUrls,
	};
}

function formDataToToolObject(formData: FormData): Tool {
	const safeParse = (key: string, defaultValue: unknown) => {
		const value = formData.get(key) as string;
		try {
			return value ? JSON.parse(value) : defaultValue;
		} catch (_e) {
			console.error(`Failed to parse JSON for key: ${key}`, value);
			return defaultValue;
		}
	};

	const toolLogo = formData.get("toolLogo");
	const images = formData.getAll("images");

	return {
		toolLogo: toolLogo instanceof File ? toolLogo : undefined,
		images: images.filter((img) => img instanceof File) as File[],

		platform: safeParse("platform", {}),
		keywords: safeParse("keywords", []),
		cores: safeParse("cores", []),
		plans: safeParse("plans", []),
		videos: safeParse("videos", []),
		blogLinks: safeParse("blogLinks", []),
		relatedToolIds: safeParse("relatedToolIds", []),

		toolMainName: formData.get("toolMainName") as string,
		toolSubName: formData.get("toolSubName") as string,
		category: formData.get("category") as string,
		toolLink: formData.get("toolLink") as string,
		planLink: formData.get("planLink") as string,
		description: formData.get("description") as string,
		license: formData.get("license") as string,
		supportKorea: formData.get("supportKorea") === "true",
		detailDescription: formData.get("detailDescription") as string,
	} as Tool;
}

export async function submitTool({ request, params }: ActionFunctionArgs) {
	const { toolId } = params;

	const requestFormData = await request.formData();

	const intent = requestFormData.get("intent") as "draft" | "publish";

	const formDataObject = formDataToToolObject(requestFormData);

	if (intent === "draft") {
		return { ok: true };
	} else if (intent === "publish") {
		try {
			const toolDataWithUrls = await handleFileUploads(formDataObject);
			const createRequest = await transformToCreateRequest(toolDataWithUrls);

			if (toolId) {
				patchTool(createRequest, Number(toolId));
			} else {
				console.log(createRequest);
				// postTool(createRequest);
			}

			return { ok: true };
		} catch (error: unknown) {
			let message = "알 수 없는 오류가 발생했습니다.";

			if (isAxiosError(error)) {
				message = error.response?.data?.message || error.message;
			} else if (error instanceof Error) {
				message = error.message;
			}

			return {
				ok: false,
				message: message,
			};
		}
	}
	return { ok: false, message: "알 수 없는 작업 요청입니다." };
}

export async function action(args: ActionFunctionArgs) {
	const result = await submitTool(args);

	// if (result.ok) {
	// 	return redirect("/tool");
	// }

	return result;
}

export default function ToolEditPage() {
	return <ToolEditForm />;
}
