export type NotificationType = "COMMENT" | "NOTICE";

export interface NotificationData {
	id: number;
	title: string;
	content: string;
	boardId?: number | null;
	type: NotificationType;
	createdAt: string;
	isRead: boolean;
	url?: string | null;
}
