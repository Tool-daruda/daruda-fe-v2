"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { LoginData, SignupData, SignupReq } from "@/common/api/models/auth.model";
import { fetchServer } from "../fetch-server";
import { createSafeAction } from "../safe-action";

async function getKakaoLoginUrl() {
	return await fetchServer<string>("/api/v1/auth/login-url?socialType=KAKAO", {
		method: "GET",
	});
}

async function loginWithKakao(code: string) {
	const query = new URLSearchParams({ code });
	const loginData = await fetchServer<LoginData>(`/api/v1/auth/login?${query.toString()}`, {
		method: "POST",
		body: JSON.stringify({ socialType: "KAKAO" }),
	});

	// TODO: 로그인 이슈에서 처리
	// 1. /login/callback 페이지에서 이 액션을 호출하도록 변경 (현재 미구현)
	// 2. loginData를 userInfo 쿠키에 저장 → community/layout.tsx의 getUserProfile() 호출 제거
	// 3. fetchServer가 Spring Boot Set-Cookie 헤더를 브라우저로 포워딩하도록 수정

	return loginData;
}

async function signup(formData: SignupReq) {
	const signupData = await fetchServer<SignupData>("/api/v1/auth/sign-up", {
		method: "POST",
		body: JSON.stringify(formData),
	});

	return signupData;
}

export const getKakaoLoginUrlAction = createSafeAction(getKakaoLoginUrl);

export const loginWithKakaoAction = createSafeAction(loginWithKakao);

export const signupAction = createSafeAction(signup);

export async function logoutAction() {
	try {
		await fetchServer("/api/v1/auth/logout", { method: "POST" });
	} catch (error) {
		console.error("백엔드 로그아웃 실패:", error);
	} finally {
		const cookieStore = await cookies();
		cookieStore.delete("accessToken");
		cookieStore.delete("refreshToken");

		redirect("/");
	}
}

export async function withdrawAction() {
	try {
		await fetchServer("/api/v1/auth/withdraw", { method: "DELETE" });

		const cookieStore = await cookies();
		cookieStore.delete("accessToken");
		cookieStore.delete("refreshToken");
	} catch (error) {
		console.error("회원 탈퇴 실패:", error);

		return;
	}

	redirect("/");
}
