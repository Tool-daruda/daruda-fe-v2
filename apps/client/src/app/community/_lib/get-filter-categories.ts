import { ToolApi } from "@/common/api/tool-api";
import type { CommunityFilterCategory } from "../_types";

const TOOLS_PER_CATEGORY_SIZE = 50;

/**
 * @description 카테고리 목록과 카테고리별 툴 목록을 병렬로 조회합니다.
 * 커뮤니티 목록 필터링 옵션, 글 작성/수정 폼의 툴 검색에서 공통으로 사용됩니다.
 */
export const getCommunityFilterCategories = async (): Promise<CommunityFilterCategory[]> => {
	const categoriesRes = await ToolApi.getCategories().catch(() => []);
	const categories = (categoriesRes || []).filter((category) => category.name !== "ALL");

	return Promise.all(
		categories.map(async (category) => {
			const toolsRes = await ToolApi.getToolList({
				category: category.name,
				isFree: false,
				size: TOOLS_PER_CATEGORY_SIZE,
			}).catch(() => null);

			return {
				name: category.name,
				koreanName: category.koreanName,
				tools: (toolsRes?.tools || []).map((tool) => ({
					toolId: tool.toolId,
					toolName: tool.toolName,
					toolLogo: tool.toolLogo,
				})),
			};
		})
	);
};
