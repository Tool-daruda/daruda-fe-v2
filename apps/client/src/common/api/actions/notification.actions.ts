"use server";

import { fetchServer } from "../fetch-server";
import type { NotificationData } from "../models/notification.model";
import { createSafeAction } from "../safe-action";

async function getNotifications(_?: undefined) {
	return fetchServer<NotificationData[]>("/api/v1/notification", {
		method: "GET",
		cache: "no-store",
	});
}

async function getRecentNotifications(_?: undefined) {
	return fetchServer<NotificationData[]>("/api/v1/notification/recent", {
		method: "GET",
		cache: "no-store",
	});
}

async function readNotification(id: number) {
	return fetchServer<void>(`/api/v1/notification/read/${id}`, {
		method: "PATCH",
	});
}

export const getNotificationsAction = createSafeAction(getNotifications);
export const getRecentNotificationsAction = createSafeAction(getRecentNotifications);
export const readNotificationAction = createSafeAction(readNotification);
