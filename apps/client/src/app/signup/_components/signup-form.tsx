"use client";

import { Radio, RadioGroup } from "@repo/ui";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { checkNicknameAction, signupAction } from "@/common/api/actions/auth.actions";
import * as styles from "./signup-form.css";

const POSITIONS = [
	{ key: "student", label: "학생", value: "학생" },
	{ key: "worker", label: "직장인", value: "직장인" },
	{ key: "freelancer", label: "일반인", value: "일반인" },
] as const;

const NICKNAME_ALLOWED_PATTERN = /[^가-힣a-zA-Z0-9]/g;

type ValidationState = { type: "error" | "success"; message: string } | null;

export function SignupForm() {
	const router = useRouter();
	const [nickname, setNickname] = useState("");
	const [position, setPosition] = useState("");
	const [validation, setValidation] = useState<ValidationState>(null);
	const [isCheckingNickname, setIsCheckingNickname] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const validationRequestRef = useRef(0);

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(NICKNAME_ALLOWED_PATTERN, "");
		setNickname(value);
		setValidation(null);

		if (timerRef.current) clearTimeout(timerRef.current);
		const requestId = validationRequestRef.current + 1;
		validationRequestRef.current = requestId;

		if (value.length === 0) {
			setIsCheckingNickname(false);
			return;
		}

		if (value.length > 10) {
			setIsCheckingNickname(false);
			setValidation({ type: "error", message: "닉네임은 최대 10자 이내로 구성해주세요." });
			return;
		}

		setIsCheckingNickname(true);
		timerRef.current = setTimeout(() => {
			void (async () => {
				const result = await checkNicknameAction(value);
				if (validationRequestRef.current !== requestId) return;

				setIsCheckingNickname(false);
				if (!result.success) {
					setValidation({ type: "error", message: "중복 확인 중 오류가 발생했어요." });
					return;
				}

				if (result.data) {
					setValidation({ type: "error", message: "중복되는 닉네임이에요." });
				} else {
					setValidation({ type: "success", message: "사용할 수 있는 닉네임이에요." });
				}
			});
		}, 400);
	};

	const isFormValid =
		validation?.type === "success" && position !== "" && !isSubmitting && !isCheckingNickname;

	const handleSubmit = async () => {
		if (!isFormValid) return;

		const positionValue = POSITIONS.find((p) => p.key === position)?.value;
		if (!positionValue) return;

		setIsSubmitting(true);
		setSubmitError(null);
		try {
			const result = await signupAction({ nickname, positions: positionValue });
			if (result.success) {
				router.push("/");
				router.refresh();
				return;
			}
			setSubmitError(result.error || "회원가입에 실패했어요. 다시 시도해 주세요.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>회원가입</h1>

			<section className={styles.section}>
				<span className={styles.label}>소속을 선택해주세요.</span>
				<div className={styles.radioGroup}>
					<RadioGroup value={position} onValueChange={setPosition}>
						{POSITIONS.map(({ key, label }) => (
							<Radio key={key} value={key} className={styles.radioItem}>
								{label}
							</Radio>
						))}
					</RadioGroup>
				</div>
			</section>

			<section className={styles.section}>
				<span className={styles.label}>닉네임을 입력해주세요.</span>
				<input
					type="text"
					value={nickname}
					onChange={handleNicknameChange}
					placeholder="닉네임"
					maxLength={10}
					className={`${styles.input} ${
						validation?.type === "error"
							? styles.inputError
							: validation?.type === "success"
								? styles.inputSuccess
								: ""
					}`}
				/>
				{validation && (
					<p className={validation.type === "error" ? styles.messageError : styles.messageSuccess}>
						{validation.message}
					</p>
				)}
				<ul className={styles.helpList}>
					<li className={styles.helpItem}>- 최대 10자 이내로 작성해 주세요.</li>
					<li className={styles.helpItem}>- 띄어쓰기, 특수문자는 입력하실 수 없어요.</li>
					<li className={styles.helpItem}>
						- 기본 정보는 추후에 마이페이지에서 변경하실 수 있어요.
					</li>
				</ul>
			</section>

			{submitError && <p className={styles.messageError}>{submitError}</p>}

			<button
				type="button"
				onClick={() => void handleSubmit()}
				disabled={!isFormValid}
				className={styles.submitButton}
			>
				{isSubmitting ? "가입 중..." : "회원가입 하기"}
			</button>
		</div>
	);
}
