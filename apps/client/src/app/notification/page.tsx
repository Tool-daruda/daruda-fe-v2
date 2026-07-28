"use client";

import { NotificationItem } from "@/common/components/notification/notification-item";
import { useNotification } from "@/common/context/notification-context";
import * as s from "./notification.css";

export default function NotificationPage() {
	const { notifications, unreadCount, isLoading } = useNotification();

	return (
		<main className={s.container}>
			<header className={s.header}>
				<h1 className={s.title}>알림</h1>
				{unreadCount > 0 && <span className={s.unreadBadge}>안읽은 알림 {unreadCount}개</span>}
			</header>

			<section className={s.listArea}>
				{isLoading && notifications.length === 0 ? (
					<div className={s.emptyState}>알림 목록을 불러오는 중...</div>
				) : notifications.length === 0 ? (
					<div className={s.emptyState}>새로운 알림이 없습니다.</div>
				) : (
					notifications.map((item) => <NotificationItem key={item.id} item={item} />)
				)}
			</section>
		</main>
	);
}
