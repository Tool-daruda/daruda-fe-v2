"use server";

import { updateTag } from "next/cache";
import { fetchServer } from "@/common/api/fetch-server";
import type { ToolScrapRes } from "@/common/api/models/tool.model";
import { createSafeAction } from "@/common/api/safe-action";

/**
 * @description 툴 찜하기/해제 액션
 */
export const postToolScrapAction = createSafeAction(async (toolId: number) => {
	const data = await fetchServer<ToolScrapRes>(`/api/v1/tool/${toolId}/scrap`, {
		method: "POST",
	});

	updateTag("tools");
	return data;
});
