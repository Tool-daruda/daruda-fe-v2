"use client";

import { Radio, RadioGroup } from "@repo/ui";
import { useState } from "react";
import { logoutAction } from "@/common/api/actions/auth.actions";
import type { UserProfileData } from "@/common/api/models/auth.model";
import { updateUserProfileAction } from "../_actions/user.actions";
import * as styles from "./user.css";

type ValidationStatus = "idle" | "success" | "error";

interface Props {
	initialData: UserProfileData;
}

interface PositionInfo {
	uiText: string;
	serverValue: string;
}

const POSITION_DOMAIN: Record<string, PositionInfo> = {
	student: { uiText: "학생", serverValue: "학생" },
	worker: { uiText: "직장인", serverValue: "직장인" },
	freelancer: { uiText: "프리랜서", serverValue: "일반인" },
};

const findPositionKeyByServerValue = (serverValue: string): string => {
	switch (serverValue) {
		case "STUDENT":
		case "학생":
			return "student";
		case "WORKER":
		case "직장인":
		case "ADMIN":
			return "worker";
		default:
			return "freelancer";
	}
};

export default function UserProfileClient({ initialData }: Props) {
	const [isEditing, setIsEditing] = useState(false);
	const [nickname, setNickname] = useState(initialData?.nickname || "");
	const [affiliation, setAffiliation] = useState(() =>
		findPositionKeyByServerValue(initialData?.positions)
	);

	const [nicknameStatus, setNicknameStatus] = useState<ValidationStatus>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setNickname(value);

		if (value.length === 0) {
			setNicknameStatus("idle");
			setErrorMessage("");
			return;
		}

		if (value.length > 10) {
			setNicknameStatus("error");
			setErrorMessage("닉네임은 최대 10자 이내로 구성해주세요.");
			return;
		}

		setNicknameStatus("success");
		setErrorMessage("");
	};

	const handleSave = async () => {
		if (nicknameStatus === "error" || nickname.length === 0) return;

		const targetPosition = POSITION_DOMAIN[affiliation]?.serverValue;

		const payload: Partial<{ nickname: string; positions: string }> = {};

		if (nickname !== initialData?.nickname) {
			payload.nickname = nickname;
		}
		if (affiliation !== findPositionKeyByServerValue(initialData?.positions)) {
			payload.positions = targetPosition;
		}

		if (Object.keys(payload).length === 0) {
			setIsEditing(false);
			return;
		}

		try {
			const result = await updateUserProfileAction(payload);
			if (!result.success) {
				alert(result.error || "정보 변경에 실패했습니다. 다시 시도해 주세요.");
				return;
			}
			alert("정보가 성공적으로 변경되었습니다.");
			setIsEditing(false);
		} catch {
			alert("정보 변경 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
		}
	};

	const handleLogout = async () => {
		if (confirm("로그아웃 하시겠습니까?")) {
			await logoutAction();
		}
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
						<span className={styles.infoValue}>{POSITION_DOMAIN[affiliation]?.uiText}</span>
					</div>
				</div>

				<div className={styles.actionButtonGroup}>
					<button type="button" onClick={handleLogout} className={styles.textButtonOrange}>
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
					<RadioGroup value={affiliation} onValueChange={setAffiliation}>
						{Object.entries(POSITION_DOMAIN).map(([key, { uiText }]) => (
							<Radio key={key} value={key} className={styles.customRadio}>
								{uiText}
							</Radio>
						))}
					</RadioGroup>
				</div>
			</section>

			<button type="button" onClick={handleSave} className={styles.submitButton}>
				저장
			</button>
		</div>
	);
}
