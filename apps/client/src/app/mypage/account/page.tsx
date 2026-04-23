"use client";

import * as styles from "./account.css";

export default function AccountPage() {
	const handleWithdraw = () => {
		const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.");

		if (isConfirmed) {
			console.log("탈퇴 API 호출 로직 실행...");
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>회원탈퇴</h2>

			<ul className={styles.warningList}>
				<li>회원탈퇴 시, 작성한 글과 댓글 내역은 남아있게 됩니다.</li>
				<li>한 번 회원 탈퇴할 경우 계정을 복구할 수 없습니다.</li>
			</ul>

			<button type="button" onClick={handleWithdraw} className={styles.withdrawButton}>
				탈퇴하기
			</button>
		</div>
	);
}
