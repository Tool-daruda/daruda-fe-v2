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

		// 응답의 isScraped가 로그인 사용자 기준이라 쿠키를 실어 보내야 합니다.
		return fetchServer<ToolListRes>(`/api/v1/tool?${query}`, {
			next: { tags: ["tools"] },
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
