"use server";

import { createSafeAction } from "@/common/api/safe-action";
import { UserApi } from "@/common/api/user-api";

export const fetchMoreScrapBoardsAction = createSafeAction(
	async (params: { page: number; size?: number }) => {
		return UserApi.getScrapBoards(params);
	}
);

export const fetchMoreMyBoardsAction = createSafeAction(
	async (params: { page: number; size?: number }) => {
		return UserApi.getUserBoards(params);
	}
);
