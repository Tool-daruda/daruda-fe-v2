import type { FromSpec, Schemas } from "@repo/api-types/helpers";

export type ReportType = Schemas["CreateReportRequest"]["reportType"];

// boardId·commentId는 둘 중 하나만 채워 보냅니다. 채우지 않는 쪽은 null로 명시합니다.
export type CreateReportReq = Omit<Schemas["CreateReportRequest"], "boardId" | "commentId"> & {
	boardId: number | null;
	commentId: number | null;
};

export type CreateReportRes = FromSpec<
	"CreateReportResponse",
	{ boardId?: number; commentId?: number; detail?: string }
>;
