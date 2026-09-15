import Image from "next/image";
import Link from "next/link";
import { NotificationBell } from "@/common/components/notification/notification-bell";
import * as styles from "./header.css";

type Props = {
	isLoggedIn: boolean;
};

export default function HeaderAuthSection({ isLoggedIn }: Props) {
	if (!isLoggedIn) {
		return (
			<div className={styles.authSection}>
				<Link
					href="/search"
					aria-label="검색"
					className={`${styles.iconButton} ${styles.mobileOnly}`}
				>
					<Image src="/icons/ic_search_gray500_20.svg" alt="" width={20} height={20} />
				</Link>
				<Link href="/login" className={`${styles.navLink} ${styles.desktopOnly}`}>
					로그인
				</Link>
			</div>
		);
	}

	return (
		<div className={styles.authSection}>
			<Link
				href="/search"
				aria-label="검색"
				className={`${styles.iconButton} ${styles.mobileOnly}`}
			>
				<Image src="/icons/ic_search_gray500_20.svg" alt="" width={20} height={20} />
			</Link>
			<NotificationBell />
			<Link
				href="/mypage"
				aria-label="마이페이지"
				className={`${styles.iconButton} ${styles.desktopOnly}`}
			>
				<Image src="/icons/ic_profile_gray500_28.svg" alt="" width={28} height={28} />
			</Link>
		</div>
	);
}
