"use server";

import { revalidateTag } from "next/cache";
import { fetchServer } from "@/common/api/fetch-server";
import type { CreateCommentReq, CreateCommentRes } from "@/common/api/models/comment.model";
import { createSafeAction } from "@/common/api/safe-action";

export const postCommentAction = createSafeAction(
	async ({ boardId, payload }: { boardId: number; payload: CreateCommentReq }) => {
		const data = await fetchServer<CreateCommentRes>(`/api/v1/comment?board-id=${boardId}`, {
			method: "POST",
			body: JSON.stringify(payload),
		});

		revalidateTag(`board-${boardId}-comments`, "default");
		revalidateTag(`board-${boardId}`, "default");

		return data;
	}
);
