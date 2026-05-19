import { fetchServer } from "./fetch-server";
import type { CategoryRes, ToolListRes } from "./models/tool.model";

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

		return fetchServer<ToolListRes>(`/api/v1/tool?${query}`, {
			next: { tags: ["tools"] },
		});
	},

	/**
	 * @description 카테고리 목록 조회
	 */
	getCategories: async () => {
		return fetchServer<CategoryRes[]>("/api/v1/tool/category", {
			next: { revalidate: false },
		});
	},

	/**
	 * @description 상세 정보 조회
	 */
	getToolDetail: async (toolId: number) => {
		// TODO: ToolDetailGetRes 모델 정의 후 제네릭 타입 수정
		return fetchServer<any>(`/api/v1/tool/${toolId}`);
	},
};
