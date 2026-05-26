import { fetchServer } from "./fetch-server";
import type { UserProfileData } from "./models/auth.model";
import type { FavoriteToolsRes } from "./models/tool.model";

/**
 * @description /api/v1/user 엔드포인트와 통신하는 API 서비스입니다.
 */
export const UserApi = {
	/**
	 * @description 사용자 프로필 조회
	 */
	getUserProfile: async () => {
		return fetchServer<UserProfileData>("/api/v1/user/profile", {
			method: "GET",
			cache: "no-store",
		});
	},

	/**
	 * @description 사용자 프로필 수정
	 */
	updateUserProfile: async (payload: Partial<{ nickname: string; positions: string }>) => {
		return fetchServer<{ success: boolean }>("/api/v1/user/profile", {
			method: "PATCH",
			body: JSON.stringify(payload),
		});
	},

	/**
	 * @description 사용자가 찜한(스크랩한) 툴 목록 조회
	 */
	getFavoriteTools: async () => {
		return fetchServer<FavoriteToolsRes>("/api/v1/user/scrap-tools", {
			method: "GET",
			cache: "no-store",
		});
	},
};
