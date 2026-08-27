import { ToolApi } from "@/common/api/tool-api";
import type { CommunityFilterCategory } from "../_types";

// TODO: post-tag-selector는 카테고리 구분 없이 전체 툴을 평탄화해 이름으로 검색하므로,
// 카테고리당 첫 페이지(TOOLS_PER_CATEGORY_SIZE)를 넘는 툴은 여전히 검색되지 않음.
// community-filter-sidebar는 카테고리별 클라이언트 사이드 무한스크롤을 적용함.
const TOOLS_PER_CATEGORY_SIZE = 11;

/**
 * @description 카테고리 목록과 카테고리별 툴 목록을 병렬로 조회합니다.
 * 커뮤니티 목록 필터링 옵션, 글 작성/수정 폼의 툴 검색에서 공통으로 사용됩니다.
 */
export const getCommunityFilterCategories = async (): Promise<CommunityFilterCategory[]> => {
	const categoriesRes = await ToolApi.getCategories().catch((err) => {
		console.error("[getCommunityFilterCategories] 카테고리 조회 실패", err);
		return [];
	});
	const categories = (categoriesRes || []).filter((category) => category.name !== "ALL");

	return Promise.all(
		categories.map(async (category) => {
			const toolsRes = await ToolApi.getToolList({
				category: category.name,
				isFree: false,
				size: TOOLS_PER_CATEGORY_SIZE,
			}).catch((err) => {
				console.error(`[getCommunityFilterCategories] 툴 목록 조회 실패 (${category.name})`, err);
				return null;
			});

			const tools = toolsRes?.tools || [];
			const totalElements = toolsRes?.scrollPaginationDto?.totalElements ?? tools.length;
			const nextCursor =
				tools.length < totalElements ? (toolsRes?.scrollPaginationDto?.nextCursor ?? null) : null;

			return {
				name: category.name,
				koreanName: category.koreanName,
				tools: tools.map((tool) => ({
					toolId: tool.toolId,
					toolName: tool.toolName,
					toolLogo: tool.toolLogo,
				})),
				totalElements,
				nextCursor,
			};
		})
	);
};
