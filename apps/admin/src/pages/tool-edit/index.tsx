import { isAxiosError } from "axios";
import { type ActionFunctionArgs, type LoaderFunctionArgs, redirect } from "react-router-dom";
import {
	getAlternativeTool,
	getCoreFeature,
	getDetail,
	getPlan,
	LICENSE_OPTIONS,
	type Plan,
	type Tool,
} from "@/entities/tool";
import { useToolPostMutation, useToolUpdateMutation } from "@/entities/tool/api/queries";
import { transformToCreateRequest } from "@/entities/tool/model/transform";
import { ToolEditForm } from "@/features/tool-edit-form";
import { uploadFileAndGetUrl } from "@/shared/lib/file-uploader";

export async function loader({ params }: LoaderFunctionArgs) {
	const { toolId } = params;
	if (!toolId || toolId === "new") {
		return { toolData: {} };
	}

	try {
		const numericToolId = Number(toolId);

		const [detailData, coreFeatureData, planData, alternativeToolData] = await Promise.all([
			getDetail(numericToolId),
			getCoreFeature(numericToolId),
			getPlan(numericToolId),
			getAlternativeTool(numericToolId),
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

		const combinedToolData: Partial<Tool> = {
			...detailData,
			cores: coreFeatureData?.toolCoreResList || [],
			plantype: calculatedPlanType,
			plans: mappedPlans,
			relatedTools: alternativeToolData?.relatedToolResList || [],
			keywords: (detailData?.keywords || []).map((val: string) => ({
				value: val,
			})),
			videos: (detailData?.videos || []).map((val: string) => ({
				videoUrl: val,
			})),
			license: LICENSE_OPTIONS.find((option) => option.label === detailData?.license)?.value,
			platform: {
				web: detailData?.platform[0].Web ?? false,
				windows: detailData?.platform[0].Windows ?? false,
				mac: detailData?.platform[0].Mac ?? false,
			},
		};

		return { toolData: combinedToolData };
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
	const safeParse = (key: string, defaultValue: any) => {
		const value = formData.get(key) as string;
		try {
			return value ? JSON.parse(value) : defaultValue;
		} catch (_e) {
			console.error(`Failed to parse JSON for key: ${key}`, value);
			return defaultValue;
		}
	};

	// File 객체 가져오기
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

		toolMainName: formData.get("toolMainName") as string,
		toolSubName: formData.get("toolSubName") as string,
		category: formData.get("category") as string,
		toolLink: formData.get("toolLink") as string,
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

	const { mutate: patchMutate } = useToolUpdateMutation();
	const { mutate: postMutate } = useToolPostMutation();

	if (intent === "draft") {
		console.log("임시저장 로직 실행:", formDataObject);
		return { ok: true };
	} else if (intent === "publish") {
		try {
			const toolDataWithUrls = await handleFileUploads(formDataObject);
			const createRequest = await transformToCreateRequest(toolDataWithUrls);

			if (toolId) {
				patchMutate({ id: Number(toolId), data: createRequest });
			} else {
				postMutate(createRequest);
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

	if (result.ok) {
		return redirect("/");
	}

	return result;
}

export default function ToolEditPage() {
	return <ToolEditForm />;
}
