"use client";

import { useEffect, useId, useState } from "react";
import * as styles from "./dev-auth-panel.css";

const STORAGE_KEY = "daruda:dev-auth";

interface StoredTokens {
	accessToken: string;
	refreshToken: string;
}

function readStoredTokens(): StoredTokens | null {
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as StoredTokens) : null;
	} catch {
		return null;
	}
}

function writeStoredTokens(tokens: StoredTokens) {
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
	} catch {
		// 토큰 기억은 편의 기능일 뿐이라 저장에 실패해도 그냥 넘어간다.
	}
}

export default function DevAuthPanel({ isLoggedIn }: { isLoggedIn: boolean }) {
	const [isOpen, setIsOpen] = useState(false);
	const [accessToken, setAccessToken] = useState("");
	const [refreshToken, setRefreshToken] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isPending, setIsPending] = useState(false);

	const accessTokenId = useId();
	const refreshTokenId = useId();

	// localStorage는 하이드레이션 이후에만 읽는다.
	useEffect(() => {
		const stored = readStoredTokens();
		if (!stored) return;

		setAccessToken(stored.accessToken ?? "");
		setRefreshToken(stored.refreshToken ?? "");
	}, []);

	const requestDevAuth = async (init: RequestInit) => {
		setIsPending(true);
		setErrorMessage("");

		try {
			const response = await fetch("/api/dev/auth", init);

			if (!response.ok) {
				const body = (await response.json().catch(() => null)) as { message?: string } | null;
				setErrorMessage(body?.message ?? `요청에 실패했습니다. (${response.status})`);
				return false;
			}

			return true;
		} catch (error) {
			console.error("[dev-auth] 요청 실패:", error);
			setErrorMessage("요청 중 오류가 발생했습니다.");
			return false;
		} finally {
			setIsPending(false);
		}
	};

	const handleApply = async () => {
		const succeeded = await requestDevAuth({
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ accessToken, refreshToken }),
		});

		if (!succeeded) return;

		writeStoredTokens({ accessToken, refreshToken });
		// 쿠키를 읽는 건 서버 레이아웃이라 전체 새로고침으로 다시 그린다.
		window.location.reload();
	};

	const handleClear = async () => {
		const succeeded = await requestDevAuth({ method: "DELETE" });
		if (!succeeded) return;

		window.location.reload();
	};

	if (!isOpen) {
		return (
			<button type="button" className={styles.toggleButton} onClick={() => setIsOpen(true)}>
				DEV 로그인
			</button>
		);
	}

	return (
		<aside className={styles.panel}>
			<div className={styles.header}>
				<span className={styles.title}>DEV 로그인</span>
				<button type="button" className={styles.closeButton} onClick={() => setIsOpen(false)}>
					닫기
				</button>
			</div>

			<p className={styles.status}>
				현재 상태{" "}
				<span
					className={`${styles.statusValue} ${isLoggedIn ? styles.loggedIn : styles.loggedOut}`}
				>
					{isLoggedIn ? "로그인됨" : "로그아웃"}
				</span>
			</p>

			<div className={styles.field}>
				<label className={styles.label} htmlFor={accessTokenId}>
					accessToken
				</label>
				<textarea
					id={accessTokenId}
					className={styles.textarea}
					value={accessToken}
					onChange={(event) => setAccessToken(event.target.value)}
					spellCheck={false}
					autoComplete="off"
				/>
			</div>

			<div className={styles.field}>
				<label className={styles.label} htmlFor={refreshTokenId}>
					refreshToken (선택)
				</label>
				<textarea
					id={refreshTokenId}
					className={styles.textarea}
					value={refreshToken}
					onChange={(event) => setRefreshToken(event.target.value)}
					spellCheck={false}
					autoComplete="off"
				/>
			</div>

			{errorMessage && <p className={styles.message}>{errorMessage}</p>}

			<div className={styles.actions}>
				<button
					type="button"
					className={styles.applyButton}
					onClick={handleApply}
					disabled={isPending || !accessToken.trim()}
				>
					적용하고 새로고침
				</button>
				<button
					type="button"
					className={styles.clearButton}
					onClick={handleClear}
					disabled={isPending}
				>
					쿠키 삭제
				</button>
			</div>

			<p className={styles.hint}>
				daruda.shop 개발자도구 &gt; Application &gt; Cookies에서 값을 복사해 붙여넣으세요. 입력한
				토큰은 이 브라우저에만 저장되어 다음에 자동으로 채워집니다.
			</p>
		</aside>
	);
}
