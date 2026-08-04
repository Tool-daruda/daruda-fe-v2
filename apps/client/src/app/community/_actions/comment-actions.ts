"use server";

import { updateTag } from "next/cache";
import { fetchServer } from "@/common/api/fetch-server";
import type { CreateCommentReq, CreateCommentRes } from "@/common/api/models/comment.model";
import { createSafeAction } from "@/common/api/safe-action";

export const deleteCommentAction = createSafeAction(
	async ({ commentId, boardId }: { commentId: number; boardId: number }) => {
		await fetchServer(`/api/v1/comment/${commentId}`, { method: "DELETE" });
		updateTag(`board-${boardId}-comments`);
		updateTag(`board-${boardId}`);
		return {};
	}
);

export const postCommentAction = createSafeAction(
	async ({ boardId, payload }: { boardId: number; payload: CreateCommentReq }) => {
		const data = await fetchServer<CreateCommentRes>(`/api/v1/comment?board-id=${boardId}`, {
			method: "POST",
			body: JSON.stringify(payload),
		});

		updateTag(`board-${boardId}-comments`);
		updateTag(`board-${boardId}`);

		return data;
	}
);
