"use server";

import { revalidateTag } from "next/cache";
import { fetchServer } from "@/common/api/fetch-server";
import type { BoardScrapRes, BoardWriteReq, BoardWriteRes } from "@/common/api/models/board.model";
import { createSafeAction } from "@/common/api/safe-action";

export const postBoardScrapAction = createSafeAction(async (boardId: number) => {
	const data = await fetchServer<BoardScrapRes>(`/api/v1/board/${boardId}/scrap`, {
		method: "POST",
	});

	revalidateTag(`board-${boardId}`, "default");
	revalidateTag("all-boards", "default");

	return data;
});

export const createBoardAction = createSafeAction(async (payload: BoardWriteReq) => {
	const data = await fetchServer<BoardWriteRes>("/api/v1/board", {
		method: "POST",
		body: JSON.stringify(payload),
	});

	revalidateTag("all-boards", "default");

	return data;
});

export const updateBoardAction = createSafeAction(
	async ({ boardId, payload }: { boardId: number; payload: BoardWriteReq }) => {
		const data = await fetchServer<BoardWriteRes>(`/api/v1/board/${boardId}`, {
			method: "PATCH",
			body: JSON.stringify(payload),
		});

		revalidateTag(`board-${boardId}`, "default");
		revalidateTag("all-boards", "default");

		return data;
	}
);
