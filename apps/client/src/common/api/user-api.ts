import { fetchServer } from "./fetch-server";
import type { UserProfileData } from "./models/auth.model";
import type { FavoriteToolsRes, MyBoardsRes } from "./models/tool.model";

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

	/**
	 * @description 사용자가 작성한 게시글 목록 조회
	 */
	getUserBoards: async (params?: { page?: number; size?: number; criteria?: string }) => {
		const query = new URLSearchParams({
			page: String(params?.page || 1),
			size: String(params?.size || 5),
			criteria: params?.criteria || "createdAt",
		}).toString();

		return fetchServer<MyBoardsRes>(`/api/v1/user/boards?${query}`, {
			method: "GET",
			cache: "no-store",
		});
	},
};
