export interface CommunityFilterTool {
	toolId: number;
	toolName: string;
	toolLogo?: string;
}

export interface CommunityFilterCategory {
	name: string;
	koreanName: string;
	tools: CommunityFilterTool[];
	totalElements: number;
	nextCursor: number | null;
}
