import type { FromSpec } from "@repo/api-types/helpers";
import type { ApiLicenseType } from "@/common/constants/price";

// license는 스펙상 string이지만 화면에서 가격 라벨(LICENSE_MAP)로 매핑해야 해 유니온으로 좁힙니다.
export type ToolSummary = FromSpec<"ToolResponse", { license: ApiLicenseType }>;

export type ToolListRes = FromSpec<"ToolListResponse", { tools: ToolSummary[] }>;

export type CategoryRes = FromSpec<"CategoryResponse">;

// 서버가 오타 필드명(scarp)으로 내려주고 있습니다. 서버가 바로잡아도 동작하도록 둘 다 받습니다.
export type ToolScrapRes = FromSpec<"ToolScrapResponse", { scarp?: boolean; scrap?: boolean }>;

export type ToolLikeRes = FromSpec<"ToolLikeResponse">;

export type FavoriteTool = FromSpec<"ToolDtoGetResponse", { license: ApiLicenseType }>;

export type FavoriteToolsRes = FromSpec<"FavoriteToolsResponse", { toolList: FavoriteTool[] }>;

export type MyBoardItem = FromSpec<"ScrapBoardsResponse">;

export type PageInfo = FromSpec<"PagenationDto">;

export type MyBoardsRes = FromSpec<"ScrapBoardsRetrieveResponse", { boardList: MyBoardItem[] }>;

export type ToolDetailRes = FromSpec<"ToolDetailGetResponse">;

// 무료 플랜은 가격이 내려오지 않습니다.
export type ToolPlanItem = FromSpec<
	"PlanResponse",
	{ priceAnnual: number | null; priceMonthly: number | null }
>;

export type ToolPlanRes = FromSpec<"PlanListResponse", { toolPlans: ToolPlanItem[] }>;

export type ToolCoreFeature = FromSpec<"ToolCoreResponse">;

export type ToolCoreFeaturesRes = FromSpec<
	"ToolCoreListResponse",
	{ toolCoreResList: ToolCoreFeature[] }
>;

// title 이하는 링크 미리보기용 메타데이터입니다. 원문에서 긁어오는 값이라 비어 있을 수 있습니다.
export type ToolBlog = FromSpec<
	"ToolBlogResponse",
	{
		title?: string;
		thumbnailUrl?: string;
		summary?: string;
		siteName?: string;
		faviconUrl?: string;
	}
>;

export type ToolBlogsRes = FromSpec<"ToolBlogListResponse", { toolBlogs: ToolBlog[] }>;

export type AlternativeTool = FromSpec<"RelatedToolResponse">;

export type ToolAlternativesRes = FromSpec<
	"RelatedToolListResponse",
	{ relatedToolResList: AlternativeTool[] }
>;
