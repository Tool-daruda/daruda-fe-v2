"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useIsLoggedIn } from "@/common/context/auth-context";
import { useNotification } from "@/common/context/notification-context";
import * as s from "./notification-bell.css";
import { NotificationPopover } from "./notification-popover";

export function NotificationBell() {
	const isLoggedIn = useIsLoggedIn();
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

	if (!isLoggedIn) return null;

	return (
		<div ref={wrapperRef} className={s.bellWrapper}>
			<button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				aria-label="알림 목록 보기"
				className={s.bellButton}
			>
				<Image src="/icons/ic_alarm_gray500_28.svg" alt="" width={28} height={28} />
				{unreadCount > 0 && <span className={s.badgeDot} />}
			</button>

			{isOpen && <NotificationPopover onClose={() => setIsOpen(false)} />}
		</div>
	);
}
