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
