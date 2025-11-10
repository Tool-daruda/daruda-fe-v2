import { TOOL_CATEGORY_LIST } from "./constants";
import type { PostToolRequest, Tool } from "./types";

export const transformToCreateRequest = async (
	formData: Omit<Tool, "plantype"> & { planType: Tool["plantype"] }
): Promise<PostToolRequest> => {
	return {
		toolMainName: formData.toolMainName,
		toolSubName: formData.toolSubName,
		toolLink: formData.toolLink,
		description: formData.description,
		license: formData.license,
		supportKorea: formData.supportKorea as boolean,
		detailDescription: formData.detailDescription,
		planLink: formData.planLink,
		planType: formData.planType as "무료" | "월간" | "구매" | "월간 & 연간",
		toolLogo: formData.toolLogo as string,
		images: formData.images as string[],
		toolPlatForm: formData.platform,

		relatedToolIds: formData.relatedToolIds.filter(Boolean),
		keywords: (formData.keywords || []).map((k) => k.value).filter(Boolean),
		cores: (formData.cores || []).map((c) => ({
			coreName: c.coreTitle,
			coreContent: c.coreContent,
		})),
		plans: formData.plans || [],
		videos: (formData.videos || []).map((v) => v.videoUrl).filter(Boolean),
		blogLinks: formData.blogLinks.filter((link) => link !== ""),
		category: TOOL_CATEGORY_LIST.find((c) => c.name === formData.category)?.koreanName ?? "",
	};
};
