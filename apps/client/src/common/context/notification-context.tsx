"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	getNotificationsAction,
	readNotificationAction,
} from "../api/actions/notification.actions";
import type { NotificationData } from "../api/models/notification.model";
import { useCurrentUser } from "./user-context";

type NotificationListener = (data: NotificationData) => void;

class SseConnectionManager {
	private static instance: SseConnectionManager;
	private eventSource: EventSource | null = null;
	private listeners = new Set<NotificationListener>();
	private lastEventId = "";
	private isConnecting = false;
	private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

	private constructor() {}

	public static getInstance(): SseConnectionManager {
		if (!SseConnectionManager.instance) {
			SseConnectionManager.instance = new SseConnectionManager();
		}
		return SseConnectionManager.instance;
	}

	public subscribe(listener: NotificationListener): () => void {
		this.listeners.add(listener);

		if (!this.eventSource && !this.isConnecting) {
			this.connect();
		}

		return () => {
			this.listeners.delete(listener);
			if (this.listeners.size === 0) {
				this.disconnect();
			}
		};
	}

	public connect() {
		if (typeof window === "undefined" || this.eventSource) return;

		this.isConnecting = true;

		try {
			const url = this.lastEventId
				? `/api/notification/connect?lastEventId=${encodeURIComponent(this.lastEventId)}`
				: "/api/notification/connect";
			this.eventSource = new EventSource(url);

			this.eventSource.onopen = () => {
				this.isConnecting = false;
			};

			const handleEvent = (event: MessageEvent) => {
				if (event.lastEventId) {
					this.lastEventId = event.lastEventId;
				}
				if (!event.data) return;

				try {
					const data = JSON.parse(event.data) as NotificationData;
					if (data && typeof data === "object" && "id" in data) {
						this.listeners.forEach((listener) => {
							listener(data);
						});
					}
				} catch {
					// Ignore heartbeat/ping
				}
			};

			this.eventSource.addEventListener("message", handleEvent);
			this.eventSource.addEventListener("COMMENT", handleEvent);
			this.eventSource.addEventListener("NOTICE", handleEvent);

			this.eventSource.onerror = () => {
				this.isConnecting = false;
				this.disconnect();
				if (this.listeners.size > 0 && !this.reconnectTimer) {
					this.reconnectTimer = setTimeout(
						() => {
							this.reconnectTimer = null;
							if (this.listeners.size > 0) {
								this.connect();
							}
						},
						5000 + Math.random() * 2000
					);
				}
			};
		} catch {
			this.isConnecting = false;
		}
	}

	public disconnect() {
		if (this.reconnectTimer) {
			clearTimeout(this.reconnectTimer);
			this.reconnectTimer = null;
		}
		if (this.eventSource) {
			this.eventSource.close();
			this.eventSource = null;
		}
		this.isConnecting = false;
	}
}

const sseManager = SseConnectionManager.getInstance();

interface NotificationContextValue {
	notifications: NotificationData[];
	unreadCount: number;
	isLoading: boolean;
	markAsRead: (id: number) => Promise<void>;
	refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
	const currentUser = useCurrentUser();
	const [notifications, setNotifications] = useState<NotificationData[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const loadNotifications = useCallback(async () => {
		if (!currentUser) {
			setNotifications([]);
			return;
		}
		setIsLoading(true);
		try {
			const res = await getNotificationsAction(undefined);
			if (res.success && res.data) {
				setNotifications(res.data);
			}
		} finally {
			setIsLoading(false);
		}
	}, [currentUser]);

	useEffect(() => {
		void loadNotifications();
	}, [loadNotifications]);

	useEffect(() => {
		if (!currentUser) return;

		const unsubscribe = sseManager.subscribe((newNotif) => {
			setNotifications((prev) => {
				if (prev.some((n) => n.id === newNotif.id)) return prev;
				return [newNotif, ...prev];
			});
		});

		return () => {
			unsubscribe();
		};
	}, [currentUser]);

	const markAsRead = useCallback(async (id: number) => {
		setNotifications((prev) =>
			prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
		);
		const res = await readNotificationAction(id);
		if (!res.success) {
			setNotifications((prev) =>
				prev.map((item) => (item.id === id ? { ...item, isRead: false } : item))
			);
		}
	}, []);

	const unreadCount = useMemo(() => {
		return notifications.filter((item) => !item.isRead).length;
	}, [notifications]);

	const value = useMemo(
		() => ({
			notifications,
			unreadCount,
			isLoading,
			markAsRead,
			refreshNotifications: loadNotifications,
		}),
		[notifications, unreadCount, isLoading, markAsRead, loadNotifications]
	);

	return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

const defaultContextValue: NotificationContextValue = {
	notifications: [],
	unreadCount: 0,
	isLoading: false,
	markAsRead: async () => {},
	refreshNotifications: async () => {},
};

export function useNotification() {
	const context = useContext(NotificationContext);
	return context ?? defaultContextValue;
}
