"use client";

import { useEffect, useRef, useState } from "react";
import { useNotification } from "@/common/context/notification-context";
import { useCurrentUser } from "@/common/context/user-context";
import * as s from "./notification-bell.css";
import { NotificationPopover } from "./notification-popover";

export function NotificationBell() {
	const currentUser = useCurrentUser();
	const { unreadCount } = useNotification();
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	if (!currentUser) return null;

	return (
		<div ref={wrapperRef} className={s.bellWrapper}>
			<button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				aria-label="알림 목록 보기"
				className={s.bellButton}
			>
				<BellIcon />
				{unreadCount > 0 && <span className={s.badgeDot} />}
			</button>

			{isOpen && <NotificationPopover onClose={() => setIsOpen(false)} />}
		</div>
	);
}

function BellIcon() {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path
				d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z"
				fill="currentColor"
			/>
		</svg>
	);
}
