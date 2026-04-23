"use client";

import { useState } from "react";
import * as styles from "../mypage.css";

type ValidationStatus = "idle" | "success" | "error";

export default function UserProfilePage() {
	const [isEditing, setIsEditing] = useState(false);

	const [nickname, setNickname] = useState("현재닉네임은최대10");
	const [affiliation, setAffiliation] = useState("student");

	const [nicknameStatus, setNicknameStatus] = useState<ValidationStatus>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const affiliationMap: Record<string, string> = {
		student: "학생",
		worker: "직장인",
		freelancer: "프리랜서",
	};

	const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setNickname(value);

		if (value.length === 0) {
			setNicknameStatus("idle");
			setErrorMessage("");
		} else if (value.length > 10) {
			setNicknameStatus("error");
			setErrorMessage("닉네임은 최대 10자 이내로 구성해주세요.");
		} else if (value === "중복되는닉네임") {
			setNicknameStatus("error");
			setErrorMessage("중복되는 닉네임이에요.");
		} else {
			setNicknameStatus("success");
			setErrorMessage("");
		}
	};

	const handleSave = () => {
		if (nicknameStatus === "error") return;
		// TODO: 서버에 저장하는 API 로직 추가
		console.log("저장됨:", { nickname, affiliation });
		setIsEditing(false);
	};

	if (!isEditing) {
		return (
			<div className={styles.formWrapper}>
				<h2 className={styles.sectionTitle}>현재 정보</h2>

				<div className={styles.infoContainer}>
					<div className={styles.infoRow}>
						<span className={styles.infoLabel}>닉네임</span>
						<span className={styles.infoValue}>{nickname}</span>
					</div>
					<div className={styles.infoRow}>
						<span className={styles.infoLabel}>소속</span>
						<span className={styles.infoValue}>{affiliationMap[affiliation]}</span>
					</div>
				</div>

				<div className={styles.actionButtonGroup}>
					<button type="button" className={styles.textButtonOrange}>
						로그아웃
					</button>
					<button
						type="button"
						onClick={() => setIsEditing(true)}
						className={styles.textButtonBlue}
					>
						수정하기
					</button>
				</div>
			</div>
		);
	}

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
					onChange={handleNicknameChange}
					// 상태에 따라 인풋 테두리 클래스 조합
					className={`${styles.inputField} ${
						nicknameStatus === "success"
							? styles.inputSuccess
							: nicknameStatus === "error"
								? styles.inputError
								: ""
					}`}
				/>

				{nicknameStatus === "success" && (
					<div className={styles.messageSuccess}>사용할 수 있는 닉네임이에요.</div>
				)}
				{nicknameStatus === "error" && <div className={styles.messageError}>{errorMessage}</div>}

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

			<button type="button" onClick={handleSave} className={styles.submitButton}>
				저장
			</button>
		</div>
	);
}
