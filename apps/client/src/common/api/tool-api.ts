import { fetchPublic } from "./fetch-public";
import { fetchServer } from "./fetch-server";
import type {
	CategoryRes,
	ToolAlternativesRes,
	ToolBlogsRes,
	ToolCoreFeaturesRes,
	ToolDetailRes,
	ToolListRes,
	ToolPlanRes,
} from "./models/tool.model";

/**
 * @description /api/v1/tool 엔드포인트와 통신하는 API 서비스입니다.
 */
export const ToolApi = {
	/**
	 * @description 툴 목록 조회
	 */
	getToolList: async (params: {
		criteria?: string;
		category?: string;
		size?: number;
		lastToolId?: number;
		isFree: boolean;
	}) => {
		const query = new URLSearchParams({
			criteria: params.criteria || "popular",
			category: params.category || "ALL",
			size: String(params.size || 18),
			isFree: String(params.isFree),
			...(params.lastToolId && { lastToolId: String(params.lastToolId) }),
		}).toString();

		// 쿠키를 안 붙여야 전 사용자가 캐시를 공유합니다.
		// 그래서 응답의 isScraped는 항상 false로 오고, 찜 여부는 getScrappedToolIds로 따로 받습니다.
		// tags만으로는 Data Cache에 들어가지 않아 force-cache/revalidate가 함께 있어야 합니다.
		return fetchPublic<ToolListRes>(`/api/v1/tool?${query}`, {
			cache: "force-cache",
			next: { tags: ["tools"], revalidate: 300 },
		});
	},

	/**
	 * @description 카테고리 목록 조회
	 */
	getCategories: async () => {
		return fetchPublic<CategoryRes[]>("/api/v1/tool/category", {
			next: { revalidate: false },
		});
	},

	/**
	 * @description 툴 상세 기본 정보 조회
	 */
	getToolDetail: async (toolId: number) => {
		return fetchServer<ToolDetailRes>(`/api/v1/tool/${toolId}`, {
			next: { tags: [`tool-${toolId}`] },
		});
	},

	/**
	 * @description 툴 요금제 조회
	 */
	getToolPlans: async (toolId: number) => {
		return fetchServer<ToolPlanRes>(`/api/v1/tool/${toolId}/plans`, {
			next: { tags: [`tool-${toolId}-plans`] },
		});
	},

	/**
	 * @description 툴 핵심 기능 조회
	 */
	getToolCoreFeatures: async (toolId: number) => {
		return fetchServer<ToolCoreFeaturesRes>(`/api/v1/tool/${toolId}/core-features`, {
			next: { tags: [`tool-${toolId}-features`] },
		});
	},

	/**
	 * @description 툴 블로그 조회
	 */
	getToolBlogs: async (toolId: number) => {
		return fetchServer<ToolBlogsRes>(`/api/v1/tool/${toolId}/blogs`, {
			next: { tags: [`tool-${toolId}-blogs`] },
		});
	},

	/**
	 * @description 대안툴 목록 조회
	 */
	getToolAlternatives: async (toolId: number) => {
		return fetchServer<ToolAlternativesRes>(`/api/v1/tool/${toolId}/alternatives`, {
			next: { tags: [`tool-${toolId}-alternatives`] },
		});
	},
};
