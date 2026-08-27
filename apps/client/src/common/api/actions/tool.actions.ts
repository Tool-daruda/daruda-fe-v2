"use server";

import { updateTag } from "next/cache";
import { fetchServer } from "../fetch-server";
import type { ToolLikeRes, ToolScrapRes } from "../models/tool.model";
import { createSafeAction } from "../safe-action";
import { ToolApi } from "../tool-api";

export interface FetchMoreToolListParams {
	criteria: string;
	category: string;
	isFree: boolean;
	lastToolId: number;
	size?: number;
}

/**
 * @description 툴 목록 다음 페이지 조회 액션
 */
export const fetchMoreToolListAction = createSafeAction(async (params: FetchMoreToolListParams) => {
	return ToolApi.getToolList(params);
});

/**
 * @description 툴 찜하기/해제 액션
 */
export const postToolScrapAction = createSafeAction(async (toolId: number) => {
	const data = await fetchServer<ToolScrapRes>(`/api/v1/tool/${toolId}/scrap`, {
		method: "POST",
	});

	updateTag("tools");
	return { toolId: data.toolId, isScrapped: data.scarp ?? data.scrap ?? false };
});

/**
 * @description 툴 좋아요/해제 액션
 */
export const postToolLikeAction = createSafeAction(async (toolId: number) => {
	const data = await fetchServer<ToolLikeRes>(`/api/v1/tool/${toolId}/like`, {
		method: "POST",
	});

	updateTag(`tool-${toolId}`);
	return data;
});
