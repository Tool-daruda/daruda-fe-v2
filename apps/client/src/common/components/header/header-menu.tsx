"use client";

import { cx } from "@repo/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HEADER_MENU_LIST } from "@/common/constants/header-menu-list";
import * as styles from "./header.css";

export default function HeaderMenu() {
	const pathname = usePathname();

	return (
		<nav className={styles.nav}>
			{HEADER_MENU_LIST.map((menu) => {
				const isActive = pathname === menu.href;

				return (
					<Link
						key={menu.href}
						href={menu.href}
						className={cx(styles.navLink, { [styles.navLinkActive]: isActive })}
					>
						{menu.label}
					</Link>
				);
			})}
		</nav>
	);
}
