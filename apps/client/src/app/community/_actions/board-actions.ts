"use server";

import { updateTag } from "next/cache";
import { fetchServer } from "@/common/api/fetch-server";
import type { BoardScrapRes, BoardWriteReq, BoardWriteRes } from "@/common/api/models/board.model";
import { createSafeAction } from "@/common/api/safe-action";

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
