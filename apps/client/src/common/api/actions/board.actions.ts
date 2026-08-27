"use server";

import { updateTag } from "next/cache";
import { BoardApi } from "@/common/api/board-api";
import { fetchServer } from "@/common/api/fetch-server";
import type {
	BoardScrapRes,
	BoardSortBy,
	BoardWriteReq,
	BoardWriteRes,
} from "@/common/api/models/board.model";
import { createSafeAction } from "@/common/api/safe-action";

export interface FetchMoreBoardListParams {
	toolId?: number;
	noTopic?: boolean;
	sortBy: BoardSortBy;
	size?: number;
	lastBoardId: number;
	/** sortBy가 SCRAP일 때 필수. lastBoardId와 둘 중 하나만 보내면 서버가 400을 던진다. */
	lastScrapCount?: number;
}

/**
 * @description 게시글 목록 다음 페이지 조회 액션
 */
export const fetchMoreBoardListAction = createSafeAction(
	async (params: FetchMoreBoardListParams) => {
		return BoardApi.getBoardList(params);
	}
);

export const postBoardScrapAction = createSafeAction(async (boardId: number) => {
	const data = await fetchServer<BoardScrapRes>(`/api/v1/board/${boardId}/scrap`, {
		method: "POST",
	});

	updateTag(`board-${boardId}`);
	updateTag("all-boards");

	return data;
});

export const createBoardAction = createSafeAction(async (payload: BoardWriteReq) => {
	const data = await fetchServer<BoardWriteRes>("/api/v1/board", {
		method: "POST",
		body: JSON.stringify(payload),
	});

	updateTag("all-boards");
	if (payload.toolId) updateTag(`tool-${payload.toolId}-boards`);

	return data;
});

export const updateBoardAction = createSafeAction(
	async ({
		boardId,
		payload,
		oldToolId,
	}: {
		boardId: number;
		payload: BoardWriteReq;
		oldToolId?: number;
	}) => {
		const data = await fetchServer<BoardWriteRes>(`/api/v1/board/${boardId}`, {
			method: "PATCH",
			body: JSON.stringify(payload),
		});

		updateTag(`board-${boardId}`);
		updateTag("all-boards");
		if (payload.toolId) updateTag(`tool-${payload.toolId}-boards`);
		if (oldToolId && oldToolId !== payload.toolId) updateTag(`tool-${oldToolId}-boards`);

		return data;
	}
);

export const deleteBoardAction = createSafeAction(
	async ({ boardId, toolId }: { boardId: number; toolId?: number }) => {
		await fetchServer(`/api/v1/board/${boardId}`, { method: "DELETE" });
		updateTag(`board-${boardId}`);
		updateTag("all-boards");
		if (toolId) updateTag(`tool-${toolId}-boards`);
		return {};
	}
);
