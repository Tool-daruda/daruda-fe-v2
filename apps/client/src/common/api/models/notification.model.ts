import type { FromSpec, Schemas } from "@repo/api-types/helpers";

export type NotificationType = NonNullable<Schemas["NotificationResponse"]["type"]>;

// 공지 알림에는 연결된 게시글이 없고, 알림 종류에 따라 이동할 url이 없을 수 있습니다.
export type NotificationData = FromSpec<
	"NotificationResponse",
	{ boardId?: number | null; url?: string | null }
>;
