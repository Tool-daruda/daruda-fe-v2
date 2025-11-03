import type { PostToolRequest, Tool } from "./types";

export const transformToCreateRequest = async (formData: Tool): Promise<PostToolRequest> => {
	return {
		toolMainName: formData.toolMainName,
		toolSubName: formData.toolSubName,
		category: formData.category,
		toolLink: formData.toolLink,
		description: formData.description,
		license: formData.license,
		supportKorea: formData.supportKorea,
		detailDescription: formData.detailDescription,
		planLink: formData.planLink,
		bgColor: formData.bgColor,
		fontColor: formData.fontColor,
		toolLogo: formData.toolLogo as string,
		images: formData.images as string[],

		platform: formData.platform,
		keywords: (formData.keywords || []).map((k) => k.value),
		cores: formData.cores || [],
		plans: formData.plans || [],
		videos: (formData.videos || []).map((v) => v.videoUrl),
		relatedToolIds: (formData.relatedTools || []).map((tool) => tool.toolId),
	};
};
