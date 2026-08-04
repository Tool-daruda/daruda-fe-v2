"use client";

import { useRouter } from "next/navigation";
import type { NotificationData } from "@/common/api/models/notification.model";
import { useNotification } from "@/common/context/notification-context";
import { formatRelativeTime } from "@/common/utils/format-date";
import * as s from "./notification-item.css";

interface Props {
	item: NotificationData;
	onItemClick?: () => void;
}

export function NotificationItem({ item, onItemClick }: Props) {
	const router = useRouter();
	const { markAsRead } = useNotification();

	const handleClick = async () => {
		if (!item.isRead) {
			void markAsRead(item.id);
		}

		onItemClick?.();

		if (item.type === "COMMENT") {
			if (item.boardId) {
				router.push(`/community/${item.boardId}`);
			} else if (item.url?.startsWith("/")) {
				router.push(item.url);
			}
		} else if (item.type === "NOTICE") {
			if (item.url) {
				if (item.url.startsWith("http://") || item.url.startsWith("https://")) {
					window.open(item.url, "_blank", "noopener,noreferrer");
				} else {
					router.push(item.url);
				}
			}
		}
	};

	return (
		<button
			type="button"
			onClick={() => void handleClick()}
			className={`${s.itemWrapper} ${item.isRead ? s.readItem : s.unreadItem}`}
		>
			<div className={s.headerRow}>
				<div className={s.badgeWrapper}>
					{!item.isRead && <span className={s.unreadDot} />}
					<span className={item.type === "COMMENT" ? s.commentBadge : s.noticeBadge}>
						{item.type === "COMMENT" ? "댓글" : "공지"}
					</span>
					<span className={s.titleText}>{item.title}</span>
				</div>
				<span className={s.timeText}>{formatRelativeTime(item.createdAt)}</span>
			</div>
			<p className={s.contentText}>{item.content}</p>
		</button>
	);
}
