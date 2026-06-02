"use client";

import { getKakaoLoginUrlAction } from "@/common/api/actions/auth.actions";

export default function LoginPage() {
	const handleKakaoLogin = async () => {
		const result = await getKakaoLoginUrlAction(null);

		if (result.success && result.data) {
			window.location.href = result.data;
		} else {
			alert(result.error || "카카오 로그인 URL을 가져오지 못했습니다.");
		}
	};

	return (
		<button type="button" onClick={handleKakaoLogin} className="kakao-login-btn">
			카카오 계정으로 시작하기
		</button>
	);
}
