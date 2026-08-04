"use client";

import { useRouter } from "next/navigation";
import { withdrawUserAction } from "@/app/mypage/_actions/user.actions"; // 2단계 서버액션 임포트
import { toast } from "@/common/components/toast";
import * as styles from "./account.css";

export default function AccountPage() {
	const router = useRouter();

	const handleWithdraw = async () => {
		const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.");
		if (!isConfirmed) return;

		try {
			const result = await withdrawUserAction(undefined);

			if (!result.success) {
				toast(result.error || "회원 탈퇴 처리 중 오류가 발생했어요.");
				return;
			}

			toast("회원 탈퇴가 완료되었어요. 그동안 이용해 주셔서 감사합니다.", { duration: 4000 });

			router.push("/");
		} catch (error) {
			toast("회원 탈퇴 처리 중 오류가 발생했어요.");
			console.error("Withdrawal error:", error);
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>회원탈퇴</h2>

			<ul className={styles.warningList}>
				<li>회원탈퇴 시, 작성한 글과 댓글 내역은 남아있게 됩니다.</li>
				<li>한 번 회원 탈퇴할 경우 계정을 복구할 수 없습니다.</li>
			</ul>

			<button type="button" onClick={handleWithdraw}>
				탈퇴하기
			</button>
		</div>
	);
}
