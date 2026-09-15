"use client";

import { cx } from "@repo/ui";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HEADER_MENU_LIST } from "@/common/constants/header-menu-list";
import { useScrollLock } from "@/common/hooks/use-scroll-lock";
import * as styles from "./header.css";
import * as s from "./header-menu-drawer.css";

type Props = {
	isLoggedIn: boolean;
};

/**
 * 모바일 전용 헤더 드로어.
 *
 * 모달이 아니라 헤더 아래에서 펼쳐지는 disclosure다. 헤더는 딤 위에 그대로 살아 있어서
 * 검색·알림 버튼이 계속 눌린다. 그래서 <dialog>를 쓰지 않고(문서 전체를 inert로 만들어버린다)
 * 일반 요소 + aria-expanded/aria-controls로 구현한다. 같은 이유로 포커스 트랩도 넣지 않는다.
 */
export function HeaderMenuDrawer({ isLoggedIn }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const triggerRef = useRef<HTMLButtonElement>(null);
	const firstLinkRef = useRef<HTMLAnchorElement>(null);

	useScrollLock(isOpen);

	// biome-ignore lint/correctness/useExhaustiveDependencies: pathname이 바뀌면(=페이지 이동) 닫는다
	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (!isOpen) return;

		firstLinkRef.current?.focus();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== "Escape") return;
			setIsOpen(false);
			triggerRef.current?.focus();
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen]);

	const lastItem = isLoggedIn
		? { label: "마이페이지", href: "/mypage" }
		: { label: "로그인", href: "/login" };

	return (
		<>
			<button
				ref={triggerRef}
				type="button"
				className={cx(styles.iconButton, styles.mobileOnly)}
				aria-label="메뉴"
				aria-expanded={isOpen}
				aria-controls="header-menu-drawer"
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<Image src="/icons/ic_menu_gray500_32.svg" alt="" width={32} height={32} />
			</button>

			{isOpen && (
				<>
					<button
						type="button"
						className={s.dim}
						onClick={() => setIsOpen(false)}
						aria-label="메뉴 닫기"
					/>
					<nav id="header-menu-drawer" className={s.panel} aria-label="모바일 메뉴">
						<ul className={s.list}>
							{HEADER_MENU_LIST.map((menu, index) => (
								<li key={menu.href}>
									<Link
										ref={index === 0 ? firstLinkRef : undefined}
										href={menu.href}
										className={s.item}
										aria-current={pathname === menu.href ? "page" : undefined}
									>
										{menu.label}
									</Link>
								</li>
							))}
							<li>
								<Link href={lastItem.href} className={cx(s.item, s.itemAccent)}>
									{lastItem.label}
								</Link>
							</li>
						</ul>
					</nav>
				</>
			)}
		</>
	);
}
