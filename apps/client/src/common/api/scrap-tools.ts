import { cache } from "react";
import { hasAuthSession } from "./auth-session";
import { UserApi } from "./user-api";

/**
 * @description 로그인 사용자가 찜한 툴 ID 목록을 조회합니다.
 * @note 툴 목록 API가 공개 캐시로 바뀌면서 응답의 isScraped는 항상 false로 옵니다.
 * 찜 여부는 이 호출로 따로 받아 화면에서 머지합니다.
 * 실패하거나 비로그인이면 빈 목록(= 찜 없음)으로 떨어뜨려 목록 렌더를 막지 않습니다.
 */
export const getScrappedToolIds = cache(async (): Promise<number[]> => {
	if (!(await hasAuthSession())) return [];

	try {
		const { toolList } = await UserApi.getFavoriteTools();
		return toolList.map((tool) => tool.toolId);
	} catch {
		return [];
	}
});
