"use client";

import { useState } from "react";
import * as styles from "../mypage.css";

export default function UserProfilePage() {
	const [nickname, setNickname] = useState("또이");
	const [affiliation, setAffiliation] = useState("student");

	return (
		<div className={styles.formWrapper}>
			<h2 className={styles.sectionTitle}>정보 변경하기</h2>

			<section>
				<label htmlFor="nicknameInput" className={styles.label}>
					닉네임
				</label>
				<input
					type="text"
					id="nicknameInput"
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
					className={styles.inputField}
				/>
				<div className={styles.successMessage}>사용할 수 있는 닉네임이에요.</div>
				<ul className={styles.helpTextList}>
					<li>- 최대 10자 이내로 작성해 주세요.</li>
					<li>- 띄어쓰기, 특수문자는 입력하실 수 없어요.</li>
				</ul>
			</section>

			<section>
				<span className={styles.label}>소속</span>
				<div className={styles.radioGroup}>
					<label
						className={affiliation === "student" ? styles.activeRadioLabel : styles.radioLabel}
					>
						학생
						<input
							type="radio"
							name="affiliation"
							value="student"
							checked={affiliation === "student"}
							onChange={(e) => setAffiliation(e.target.value)}
							style={{ display: "none" }}
						/>
						{affiliation === "student" ? " ◉" : " ◯"}
					</label>

					<label className={affiliation === "worker" ? styles.activeRadioLabel : styles.radioLabel}>
						직장인
						<input
							type="radio"
							name="affiliation"
							value="worker"
							checked={affiliation === "worker"}
							onChange={(e) => setAffiliation(e.target.value)}
							style={{ display: "none" }}
						/>
						{affiliation === "worker" ? " ◉" : " ◯"}
					</label>

					<label
						className={affiliation === "freelancer" ? styles.activeRadioLabel : styles.radioLabel}
					>
						프리랜서
						<input
							type="radio"
							name="affiliation"
							value="freelancer"
							checked={affiliation === "freelancer"}
							onChange={(e) => setAffiliation(e.target.value)}
							style={{ display: "none" }}
						/>
						{affiliation === "freelancer" ? " ◉" : " ◯"}
					</label>
				</div>
			</section>

			<button type="button" className={styles.submitButton}>
				저장
			</button>
		</div>
	);
}
