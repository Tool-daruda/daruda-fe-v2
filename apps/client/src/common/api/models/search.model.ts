import type { BoardItem } from "./board.model";
import type { ToolSummary } from "./tool.model";

export type SearchTab = "tool" | "community";

export interface SearchBoardParams {
	keyword: string;
	nextCursor?: string | number;
	size?: number;
}

export interface BoardSearchRes {
	contents: BoardItem[];
	scrollPaginationDto?: {
		totalElements?: number;
		nextCursor?: number | string | null;
	};
}

export function normalizeToolSearchResponse(data: unknown): ToolSummary[] {
	if (!data) return [];
	if (Array.isArray(data)) return data as ToolSummary[];
	if (typeof data === "object" && data !== null) {
		const obj = data as Record<string, unknown>;
		if (Array.isArray(obj.tools)) return obj.tools as ToolSummary[];
		if (Array.isArray(obj.contents)) return obj.contents as ToolSummary[];
	}
	return [];
}

export function normalizeBoardSearchResponse(data: unknown): {
	contents: BoardItem[];
	nextCursor: number | string | null;
	totalElements?: number;
} {
	if (!data) return { contents: [], nextCursor: null };
	if (Array.isArray(data)) {
		const contents = (data as BoardItem[]).map((item) => ({
			...item,
			images: item.images || [],
			commentCount: item.commentCount ?? 0,
		}));
		return { contents, nextCursor: null };
	}
	if (typeof data === "object" && data !== null) {
		const obj = data as Record<string, unknown>;
		const rawContents = (
			Array.isArray(obj.contents) ? obj.contents : Array.isArray(obj.boardList) ? obj.boardList : []
		) as BoardItem[];

		const contents = rawContents.map((item) => ({
			...item,
			images: item.images || [],
			commentCount: item.commentCount ?? 0,
		}));

		let nextCursor: number | string | null = null;
		let totalElements: number | undefined;

		if (obj.scrollPaginationDto && typeof obj.scrollPaginationDto === "object") {
			const dto = obj.scrollPaginationDto as Record<string, unknown>;
			if (dto.nextCursor !== undefined && dto.nextCursor !== null) {
				nextCursor = dto.nextCursor as number | string;
			}
			if (typeof dto.totalElements === "number") {
				totalElements = dto.totalElements;
			}
		} else if (obj.nextCursor !== undefined && obj.nextCursor !== null) {
			nextCursor = obj.nextCursor as number | string;
		}

		return { contents, nextCursor, totalElements };
	}
	return { contents: [], nextCursor: null };
}
