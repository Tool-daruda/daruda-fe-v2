export type ToolCategory = {
	main: string;
	sub: string;
};

export type ToolPlatform = "Web" | "Windows" | "Mac" | "iOS" | "Android";

export type ToolFeature = {
	id: number;
	title: string;
	description: string;
};

export type ToolMedia = {
	id: number;
	title?: string;
	imageUrl: string;
};

export type PricingPlan = {
	id: string;
	name: string;
	priceText: string;
	description?: string;
	features: string[];
	isRecommended?: boolean;
};

export type UseCaseCard = {
	id: number;
	title: string;
	summary: string;
	author: string;
	thumbnailUrl: string;
};

export type RelatedPost = {
	id: number;
	category: string;
	author: string;
	date: string;
	title: string;
	summary: string;
	thumbnailUrl: string;
	likeCount: number;
	commentCount: number;
};

export type RelatedTool = {
	id: number;
	name: string;
	category: string;
	subCategory: string;
	priceType: string;
	thumbnailUrl: string;
};

export type ToolDetail = {
	slug: string;
	name: string;
	shortDescription: string;
	description: string;
	updatedAt: string;
	category: ToolCategory;
	priceLabel: string;
	platforms: ToolPlatform[];
	support: number;
	heroImageUrl: string;
	introImages: string[];
	features: ToolFeature[];
	recommendedVideos: ToolMedia[];
	pricingPlans: PricingPlan[];
	useCases: UseCaseCard[];
	relatedPosts: RelatedPost[];
	relatedTools: RelatedTool[];
	nameKo: string;
	siteUrl: string;
};
