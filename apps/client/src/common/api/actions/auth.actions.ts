"use server";

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
	const loginData = await fetchServer<LoginData>(`/api/v1/auth/login?code=${code}`, {
		method: "POST",
		body: JSON.stringify({ socialType: "KAKAO" }),
	});

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
	} catch {
		// 에러 무시
	} finally {
		redirect("/");
	}
}

export async function withdrawAction() {
	try {
		await fetchServer("/api/v1/auth/withdraw", { method: "DELETE" });
		redirect("/");
	} catch (error) {
		console.error("회원 탈퇴 실패:", error);
	}
}
