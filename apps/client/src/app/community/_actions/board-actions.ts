"use server";

import { revalidateTag } from "next/cache";
import { fetchServer } from "@/common/api/fetch-server";
import type { BoardScrapRes } from "@/common/api/models/board.model";
import { createSafeAction } from "@/common/api/safe-action";

/**
 * @description 게시글 스크랩/스크랩 해제 액션
 */
export const postBoardScrapAction = createSafeAction(async (boardId: number) => {
	const data = await fetchServer<BoardScrapRes>(`/api/v1/board/${boardId}/scrap`, {
		method: "POST",
	});

	revalidateTag(`board-${boardId}`, "default");
	revalidateTag("all-boards", "default");

	return data;
});
