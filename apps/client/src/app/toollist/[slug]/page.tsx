import { notFound } from "next/navigation";
import type { ToolDetailApiResponse } from "@/common/api/models/tool.model";
import { ToolApi } from "@/common/api/tool-api";
import { ToolDetailPage } from "./_components/tool-detail-page";
import type { ToolDetail, ToolPlatform } from "./_types";

type PageProps = {
	params: Promise<{
		slug: string;
	}>;
};

const getSupportedPlatforms = (
	platforms: ToolDetailApiResponse["info"]["platform"]
): ToolPlatform[] => {
	const platform = platforms[0];
	if (!platform) return [];

	return (Object.entries(platform) as Array<[ToolPlatform, boolean]>)
		.filter(([, isSupported]) => isSupported)
		.map(([platformName]) => platformName);
};

const formatPrice = (price: number) => {
	if (price === 0) return "무료";

	return `${price.toLocaleString("ko-KR")}원`;
};

const getYoutubeVideoId = (url: string) => {
	try {
		const parsedUrl = new URL(url);

		if (parsedUrl.hostname === "youtu.be") {
			return parsedUrl.pathname.replace("/", "");
		}

		if (parsedUrl.hostname.includes("youtube.com")) {
			return parsedUrl.searchParams.get("v");
		}

		return null;
	} catch {
		return null;
	}
};

const getVideoThumbnailUrl = (url: string) => {
	const videoId = getYoutubeVideoId(url);

	if (videoId) {
		return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
	}

	return url;
};

const toToolDetail = (response: ToolDetailApiResponse): ToolDetail => {
	const { info, plans, features, blogs, alternatives } = response;

	return {
		slug: String(info.toolId),
		name: info.toolMainName,
		shortDescription: info.description,
		description: info.detailDescription || info.description,
		updatedAt: info.updatedAt,
		category: {
			main: info.category,
			sub: info.keywords[0] ?? "",
		},
		priceLabel: info.license,
		platforms: getSupportedPlatforms(info.platform),
		support: info.supportKorea ? "지원" : "미지원",
		heroImageUrl: info.toolLogo,
		introImages: info.images,
		features: features.map((feature) => ({
			id: feature.coreId,
			title: feature.coreTitle,
			description: feature.coreContent,
		})),
		recommendedVideos: info.videos.map((videoUrl, index) => ({
			id: index + 1,
			imageUrl: getVideoThumbnailUrl(videoUrl),
			videoUrl,
		})),
		pricingPlans: plans.toolPlans.map((plan) => ({
			id: String(plan.planId),
			name: plan.planName,
			priceText: `월 ${formatPrice(plan.priceMonthly)} / 연 ${formatPrice(plan.priceAnnual)}`,
			description: plan.description,
			features: plan.description ? [plan.description] : [],
		})),
		useCases: [],
		relatedPosts: blogs.map((blog) => ({
			id: blog.blogId,
			category: info.toolMainName,
			author: "",
			date: "",
			title: blog.blogUrl,
			summary: "",
			thumbnailUrl: info.toolLogo,
			likeCount: 0,
			commentCount: 0,
		})),
		relatedTools: alternatives.map((tool) => ({
			id: tool.toolId,
			name: tool.toolName,
			category: tool.keywords[0] ?? "",
			priceType: tool.license,
			thumbnailUrl: tool.toolLogo,
		})),
		nameKo: info.toolSubName,
		siteUrl: plans.planLink || info.toolLink,
	};
};

const getFulfilledValue = <T,>(result: PromiseSettledResult<T>, apiName: string): T | null => {
	if (result.status === "fulfilled") return result.value;

	console.error(`${apiName} 데이터 로드 실패:`, result.reason);
	return null;
};

export default async function ToolDetailRoute(props: PageProps) {
	const params = await props.params;
	const toolId = Number(params.slug);

	if (Number.isNaN(toolId)) notFound();

	const [detailResult, plansResult, featuresResult, blogsResult, alternativesResult] =
		await Promise.allSettled([
			ToolApi.getToolDetail(toolId),
			ToolApi.getToolPlans(toolId),
			ToolApi.getToolCoreFeatures(toolId),
			ToolApi.getToolBlogs(toolId),
			ToolApi.getToolAlternatives(toolId),
		]);

	const detailRes = getFulfilledValue(detailResult, "툴 상세 기본 정보");
	if (!detailRes) notFound();

	const plansRes = getFulfilledValue(plansResult, "툴 요금제");
	const featuresRes = getFulfilledValue(featuresResult, "툴 핵심 기능");
	const blogsRes = getFulfilledValue(blogsResult, "툴 블로그");
	const alternativesRes = getFulfilledValue(alternativesResult, "대안툴 목록");

	const response: ToolDetailApiResponse = {
		info: detailRes,
		plans: plansRes || { planLink: "", toolPlans: [] },
		features: featuresRes?.toolCoreResList || [],
		blogs: blogsRes?.toolBlogs || [],
		alternatives: alternativesRes?.relatedToolResList || [],
	};

	console.log("툴 상세 API 응답:", response);

	return <ToolDetailPage toolDetail={toToolDetail(response)} />;
}
