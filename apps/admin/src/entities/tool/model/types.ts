import { z } from "zod";

export const PlatformSchema = z.object({
	supportWeb: z.boolean(),
	supportWindows: z.boolean(),
	supportMac: z.boolean(),
});

export const CoreSchema = z.object({
	coreTitle: z.string(),
	coreContent: z.string(),
});

export const KeywordSchema = z.object({
	value: z.string(),
});

export const VideoSchema = z.object({
	videoUrl: z.string(),
});

export const PlanSchema = z.object({
	planName: z.string(),
	priceMonthly: z.number().nullable(),
	priceAnnual: z.number().nullable(),
	description: z.string(),
	isDollar: z.boolean(),
});

export const SearchToolSchema = z.object({
	toolId: z.number(),
	toolName: z.string(),
	toolLogo: z.string(),
	description: z.string().optional(),
	license: z.string(),
	keywords: z.array(z.string()),
	isScraped: z.boolean().optional(),
	bgColor: z.string().optional(),
	fontColor: z.boolean().optional(),
});

export const ToolSchema = z.object({
	toolMainName: z.string(),
	toolSubName: z.string(),
	category: z.string(),
	toolLink: z.string(),
	description: z.string(),
	license: z.string(),
	supportKorea: z.boolean().nullable(),
	detailDescription: z.string(),
	planLink: z.string(),
	bgColor: z.string().optional(),
	fontColor: z.boolean().optional(),
	toolLogo: z.union([z.string(), z.instanceof(File)]).nullable(),
	platform: PlatformSchema,
	keywords: z.array(KeywordSchema),
	cores: z.array(CoreSchema),
	plans: z.array(PlanSchema),
	images: z.array(z.union([z.string(), z.instanceof(File)])),
	videos: z.array(VideoSchema),
	relatedToolIds: z.array(z.number()),
	plantype: z.enum(["무료", "월간", "구매", "월간 & 연간", ""]).optional(),
	updatedAt: z.string().optional(),
	relatedTools: z.array(SearchToolSchema).optional(),
	blogLinks: z.array(z.string()),
});

export const ToolCardTypeSchema = z.object({
	toolId: z.number(),
	toolLogo: z.string(),
	toolName: z.string(),
	description: z.string(),
	category: z.string(),
	createdAt: z.string(),
});

export const GetAdminToolsParamsSchema = z.object({
	page: z.number(),
	size: z.number(),
});

export const GetAdminToolsResSchema = z.object({
	tools: z.array(ToolCardTypeSchema),
	totalPages: z.number(),
	totalElements: z.number(),
});

export const PostToolRequestSchema = z.object({
	toolMainName: z.string().min(1, "필수 입력값입니다.").max(50, "최대 50자까지 입력 가능합니다."),
	toolSubName: z.string().min(1, "필수 입력값입니다.").max(50, "최대 50자까지 입력 가능합니다."),
	category: z.string().min(1, "필수 입력값입니다."),
	toolLink: z.string().url("올바른 URL을 입력해주세요").min(1, "필수 입력값입니다."),
	description: z.string().min(1, "필수 입력값입니다.").max(500, "최대 500자까지 입력 가능합니다."),
	license: z.string().min(1, "필수 입력값입니다."),
	supportKorea: z.boolean({ error: () => "필수 입력값입니다." }),
	detailDescription: z.string().min(1, "필수 입력값입니다."),
	planLink: z.string().url("올바른 URL을 입력해주세요").min(1, "필수 입력값입니다."),
	bgColor: z.string().optional(),
	fontColor: z.boolean().optional(),
	toolLogo: z.union([z.string().min(1, "필수 입력값입니다."), z.instanceof(File)]),
	toolPlatForm: PlatformSchema,
	keywords: z
		.array(z.string())
		.min(1, "필수 입력값입니다.")
		.max(2, "최대 2개까지 입력 가능합니다."),
	cores: z
		.array(
			z.object({
				coreName: z.string().max(20, "최대 20자까지 입력 가능합니다."),
				coreContent: z.string().max(500, "최대 500자까지 입력 가능합니다."),
			})
		)
		.max(10, "최대 10개까지 입력 가능합니다."),
	plans: z.array(
		z.object({
			planName: z.string().max(20, "최대 50자까지 입력 가능합니다."),
			priceMonthly: z.number().nullable(),
			priceAnnual: z.number().nullable(),
			description: z.string().max(500, "최대 500자까지 입력 가능합니다."),
			isDollar: z.boolean(),
		})
	),
	images: z.array(z.string()).min(1, "필수 입력값입니다."),
	videos: z
		.array(z.string().url("올바른 URL을 입력해주세요").optional())
		.max(2, "최대 2개까지 입력 가능합니다."),
	relatedToolIds: z.array(z.number()).length(2, "2개만 입력해주세요"),
	blogLinks: z
		.array(z.string().url("올바른 URL을 입력해주세요").optional())
		.max(3, "최대 3개까지 입력 가능합니다."),
	planType: z.enum(["무료", "월간", "구매", "월간 & 연간"], { error: () => "필수 입력값입니다." }),
});

export const DetailToolResponseSchema = z.object({
	toolMainName: z.string(),
	toolSubName: z.string(),
	category: z.string(),
	toolLink: z.string(),
	supportKorea: z.boolean(),
	detailDescription: z.string(),
	images: z.array(z.string()),
	fontColor: z.boolean(),
	updatedAt: z.string(),
	isScrapped: z.boolean(),
	keywords: z.array(z.string()),
	videos: z.array(z.string()),
	license: z.string(),
	platform: z.array(
		z.object({
			Web: z.boolean(),
			Windows: z.boolean(),
			Mac: z.boolean(),
		})
	),
});

export const ToolCoreFeatureSchema = z.object({
	coreId: z.number(),
	coreTitle: z.string(),
	coreContent: z.string(),
});

export const CoreFeatureResponseSchema = z.object({
	toolCoreResList: z.array(ToolCoreFeatureSchema),
});

export const ToolPlanSchema = z.object({
	price: z.union([z.string(), z.number()]),
	planId: z.number(),
	planName: z.string(),
	monthlyPrice: z.number().nullable(),
	annualPrice: z.number().nullable(),
	description: z.string(),
	isDollar: z.boolean(),
});

export const ToolPlanResponseSchema = z.object({
	toolPlans: z.array(ToolPlanSchema),
});

export const AlternativeToolSchema = z.object({
	toolId: z.number(),
	toolName: z.string(),
	toolLogo: z.string(),
	license: z.enum(["무료", "부분 유료", "유료"]),
	keywords: z.array(z.string()),
});

export const AlternativeToolResponseSchema = z.object({
	relatedToolResList: z.array(AlternativeToolSchema),
});

export const BlogResponseSchema = z.object({
	toolBlogs: z.array(
		z.object({
			blogId: z.number(),
			blogUrl: z.string(),
		})
	),
});

export type Tool = z.infer<typeof ToolSchema>;
export type Platform = z.infer<typeof PlatformSchema>;
export type Core = z.infer<typeof CoreSchema>;
export type Keyword = z.infer<typeof KeywordSchema>;
export type Video = z.infer<typeof VideoSchema>;
export type Plan = z.infer<typeof PlanSchema>;
export type ToolCardType = z.infer<typeof ToolCardTypeSchema>;
export type GetAdminToolsParams = z.infer<typeof GetAdminToolsParamsSchema>;
export type GetAdminToolsRes = z.infer<typeof GetAdminToolsResSchema>;
export type PostToolRequest = z.infer<typeof PostToolRequestSchema>;
export type SearchTool = z.infer<typeof SearchToolSchema>;
export type DetailToolResponse = z.infer<typeof DetailToolResponseSchema>;
export type CoreFeatureResponse = z.infer<typeof CoreFeatureResponseSchema>;
export type ToolPlanResponse = z.infer<typeof ToolPlanResponseSchema>;
export type AlternativeTool = z.infer<typeof AlternativeToolSchema>;
export type AlternativeToolResponse = z.infer<typeof AlternativeToolResponseSchema>;
export type BlogResponse = z.infer<typeof BlogResponseSchema>;
