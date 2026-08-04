"use server";

import { createSafeAction } from "@/common/api/safe-action";
import { SearchApi } from "@/common/api/search-api";

export interface FetchMoreSearchBoardParams {
	keyword: string;
	nextCursor?: string | number;
	size?: number;
}

export const fetchMoreSearchBoardAction = createSafeAction(
	async (params: FetchMoreSearchBoardParams) => {
		const result = await SearchApi.searchBoard(params);
		return result;
	}
);
