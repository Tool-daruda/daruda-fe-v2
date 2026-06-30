export interface PostDetailTool {
	toolId: number;
	toolName: string;
	toolLogo?: string;
}

export interface PostDetailImage {
	id: number;
	url?: string;
}

export interface PostDetail {
	boardId: number;
	tool: PostDetailTool;
	title: string;
	author: string;
	date: string;
	content: string;
	images: PostDetailImage[];
	scrapCount: number;
	isScrapped: boolean;
	commentCount: number;
}

export interface PostComment {
	commentId: number;
	author: string;
	date: string;
	time: string;
	content: string;
	imageUrl?: string;
}
