"use client";

import { useNotification } from "@/common/context/notification-context";

import { NotificationItem } from "./notification-item";
import * as s from "./notification-popover.css";

interface Props {
	onClose?: () => void;
}

export function NotificationPopover({ onClose }: Props) {
	const { notifications, unreadCount, isLoading } = useNotification();

	return (
		<div className={s.popoverContainer}>
			<div className={s.header}>
				<span className={s.headerTitle}>알림</span>
				{unreadCount > 0 && <span className={s.unreadBadge}>안읽음 {unreadCount}개</span>}
			</div>

			<div className={s.listScrollArea}>
				{isLoading && notifications.length === 0 ? (
					<div className={s.emptyState}>알림을 불러오는 중...</div>
				) : notifications.length === 0 ? (
					<div className={s.emptyState}>새로운 알림이 없어요.</div>
				) : (
					notifications.map((item) => (
						<NotificationItem key={item.id} item={item} onItemClick={onClose} />
					))
				)}
			</div>
		</div>
	);
}
