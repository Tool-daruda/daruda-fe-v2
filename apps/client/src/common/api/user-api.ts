import { fetchServer } from "./fetch-server";
import type { UserProfileData } from "./models/auth.model";

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
};
