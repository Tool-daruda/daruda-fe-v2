import { redirect } from "next/navigation";
import { UserApi } from "@/common/api/user-api";
import MyPageNav from "./_components/mypage-nav";
import * as styles from "./mypage.css";

export default async function MyPageLayout({ children }: { children: React.ReactNode }) {
	try {
		const initialProfile = await UserApi.getUserProfile();

		if (!initialProfile) {
			redirect("/login");
		}
	} catch (error) {
		console.error("마이페이지 인증 실패:", error);
		redirect("/login");
	}

	return (
		<div className={styles.pageWrapper}>
			<h1 className={styles.pageTitle}>마이페이지</h1>

			<MyPageNav />

			<main>{children}</main>
		</div>
	);
}
