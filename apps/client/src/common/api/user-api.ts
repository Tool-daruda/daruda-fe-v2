import { cache } from "react";
import { hasAuthSession } from "./auth-session";
import { ApiError } from "./errors/api-error";
import { fetchServer } from "./fetch-server";
import type { UserProfileData } from "./models/auth.model";
import type { FavoriteToolsRes, MyBoardsRes } from "./models/tool.model";

/**
 * @description 사용자 프로필 조회
 * @note 한 요청 안에서 레이아웃과 페이지가 각각 호출해도 실제 fetch는 1회만 발생하도록 캐싱합니다.
 */
const getUserProfile = cache(async () => {
	return fetchServer<UserProfileData>("/api/v1/user/profile", {
		method: "GET",
		cache: "no-store",
	});
});

/**
 * @description /api/v1/user 엔드포인트와 통신하는 API 서비스입니다.
 */
export const UserApi = {
	getUserProfile,

	/**
	 * @description 인증이 선택적인 화면에서 현재 로그인 사용자를 조회합니다.
	 * @note 토큰이 없으면 요청 없이 null을 반환하고, 만료/무효 토큰(401)도 null로 처리합니다.
	 */
	getCurrentUser: async (): Promise<UserProfileData | null> => {
		if (!(await hasAuthSession())) return null;

		try {
			return await getUserProfile();
		} catch (error) {
			if (error instanceof ApiError && error.status === 401) return null;
			throw error;
		}
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

	/**
	 * @description 사용자가 스크랩(좋아요)한 게시글 목록 조회
	 */
	getScrapBoards: async (params?: { page?: number; size?: number; criteria?: string }) => {
		const query = new URLSearchParams({
			page: String(params?.page || 1),
			size: String(params?.size || 5),
			criteria: params?.criteria || "createdAt",
		}).toString();

		return fetchServer<MyBoardsRes>(`/api/v1/user/scrap-boards?${query}`, {
			method: "GET",
			cache: "no-store",
		});
	},

	/**
	 * @description 회원 탈퇴
	 */
	withdrawUser: async () => {
		return fetchServer<void>("/api/v1/auth/withdraw", {
			// 본문 없이 200만 돌려주는 엔드포인트입니다.
			allowEmptyData: true,
			method: "DELETE",
		});
	},
};
