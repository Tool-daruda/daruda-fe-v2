"use client";

import { useState } from "react";
import { getKakaoLoginUrlAction } from "@/common/api/actions/auth.actions";
import * as styles from "../login.css";

interface Props {
	next?: string;
}

export function LoginButton({ next }: Props) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleKakaoLogin = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const result = await getKakaoLoginUrlAction({ next });
			if (!result.success || !result.data) {
				setError(result.error || "카카오 로그인 URL을 가져오지 못했어요.");
				return;
			}
			window.location.href = result.data;
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<button
				type="button"
				onClick={() => void handleKakaoLogin()}
				disabled={isLoading}
				className={styles.kakaoButton}
			>
				<KakaoIcon />
				{isLoading ? "이동 중..." : "카카오 계정으로 시작하기"}
			</button>
			{error && <p className={styles.errorMessage}>{error}</p>}
		</>
	);
}

function KakaoIcon() {
	return (
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
			<path
				d="M10 2C5.582 2 2 4.925 2 8.5c0 2.258 1.397 4.244 3.5 5.41L4.6 17.1a.25.25 0 0 0 .362.288L9.1 14.97c.296.022.594.03.9.03 4.418 0 8-2.925 8-6.5S14.418 2 10 2Z"
				fill="rgba(0,0,0,0.85)"
			/>
		</svg>
	);
}
