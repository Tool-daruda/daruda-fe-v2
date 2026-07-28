import type { CommunityFilterTool } from "../../_types";

export interface PostFormInitialValues {
	boardId: number;
	title: string;
	content: string;
	images: string[];
	tool: CommunityFilterTool | null;
}

export interface PostFormProps {
	mode: "create" | "edit";
	tools: CommunityFilterTool[];
	initialValues?: PostFormInitialValues;
}

export type ImageSlot =
	| { kind: "existing"; url: string }
	| { kind: "new"; id: string; file: File; previewUrl: string };
