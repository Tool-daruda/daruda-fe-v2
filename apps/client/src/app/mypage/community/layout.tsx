"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as styles from "./community.css";

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<div>
			<div className={styles.subTabContainer}>
				<Link
					href="/mypage/community/saved"
					className={
						pathname.startsWith("/mypage/community/saved")
							? styles.activeSubTab
							: styles.inactiveSubTab
					}
				>
					저장한 글
				</Link>
				<Link
					href="/mypage/community/mine"
					className={
						pathname.startsWith("/mypage/community/mine")
							? styles.activeSubTab
							: styles.inactiveSubTab
					}
				>
					내가 쓴 글
				</Link>
			</div>

			<div>{children}</div>
		</div>
	);
}
