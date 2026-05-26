"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as styles from "../mypage.css";

export default function MyPageNav() {
	const pathname = usePathname();

	const tabs = [
		{ name: "프로필", path: "/mypage/user" },
		{ name: "관심있는 툴", path: "/mypage/favorite-tools" },
		{ name: "커뮤니티", path: "/mypage/community" },
		{ name: "계정", path: "/mypage/account" },
	];

	return (
		<nav className={styles.tabContainer}>
			{tabs.map((tab) => {
				const isActive = pathname.startsWith(tab.path);

				return (
					<Link
						key={tab.path}
						href={tab.path}
						className={isActive ? styles.activeTabItem : styles.tabItem}
					>
						{tab.name}
					</Link>
				);
			})}
		</nav>
	);
}
