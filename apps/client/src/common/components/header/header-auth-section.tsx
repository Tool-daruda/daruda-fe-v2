import Image from "next/image";
import Link from "next/link";
import * as styles from "./header.css";

type Props = {
	isLoggedIn: boolean;
};

export default function HeaderAuthSection({ isLoggedIn }: Props) {
	if (!isLoggedIn) {
		return (
			<div className={styles.authSection}>
				<Link href="/login" className={styles.navLink}>
					로그인
				</Link>
			</div>
		);
	}

	return (
		<div className={styles.authSection}>
			<Link href="/notification" aria-label="알림" className={styles.iconButton}>
				<Image src="/icons/ic_alarm_gray500_28.svg" alt="" width={28} height={28} />
			</Link>
			<Link href="/mypage" aria-label="마이페이지" className={styles.iconButton}>
				<Image src="/icons/ic_profile_gray500_28.svg" alt="" width={28} height={28} />
			</Link>
		</div>
	);
}
