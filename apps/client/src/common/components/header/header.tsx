import Image from "next/image";
import Link from "next/link";
import * as styles from "./header.css";
import HeaderAuthSection from "./header-auth-section";
import HeaderMenu from "./header-menu";

type Props = {
	isLoggedIn: boolean;
};

export default function Header({ isLoggedIn }: Props) {
	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<div className={styles.leftSection}>
					<Link href="/" className={styles.logo} aria-label="홈으로 이동">
						<Image src="/icons/ic_logo_20.svg" alt="Daruda 로고" width={28} height={28} />
					</Link>
					<HeaderMenu />
				</div>

				<HeaderAuthSection isLoggedIn={isLoggedIn} />
			</div>
		</header>
	);
}
