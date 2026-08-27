"use server";

import { fetchServer } from "@/common/api/fetch-server";
import type { CreateReportReq, CreateReportRes } from "@/common/api/models/report.model";
import { createSafeAction } from "@/common/api/safe-action";

export const createReportAction = createSafeAction(async (payload: CreateReportReq) => {
	return fetchServer<CreateReportRes>("/api/v1/reports", {
		method: "POST",
		body: JSON.stringify(payload),
	});
});
