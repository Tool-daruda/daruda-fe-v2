export type ReportType =
	| "HATE_SPEECH"
	| "ILLEGAL"
	| "SPAM"
	| "ADULT_CONTENT"
	| "POLITICAL"
	| "COMMERCIAL"
	| "DEFAMATION";

export interface CreateReportReq {
	boardId: number | null;
	commentId: number | null;
	reportType: ReportType;
	title: string;
	detail?: string;
	commentReport: boolean;
}

export interface CreateReportRes {
	id: number;
	reporterId: number;
	reporterNickname: string;
	reportedUserId: number;
	reportedUserNickname: string;
	boardId?: number;
	commentId?: number;
	reportType: ReportType;
	title: string;
	detail?: string;
	createdAt: string;
	updatedAt: string;
}
