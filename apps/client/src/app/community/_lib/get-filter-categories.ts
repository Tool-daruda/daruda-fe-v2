import { ToolApi } from "@/common/api/tool-api";
import type { CommunityFilterCategory } from "../_types";

// TODO: 카테고리별 툴이 50개를 초과하면 나머지가 조회되지 않음.
// community-filter-sidebar, post-tag-selector에 클라이언트 사이드 무한스크롤 추가 필요.
// ToolApi.getToolList는 lastToolId 커서 기반 페이지네이션 지원함.
const TOOLS_PER_CATEGORY_SIZE = 50;

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
