"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_OPTIONS, applySetCookieHeaders, getSafeInternalPath } from "../cookie-utils";
import { ApiError } from "../errors/api-error";
import { fetchPublic } from "../fetch-public";
import { fetchServer } from "../fetch-server";
import type { ApiResponse } from "../models/api-response.model";
import type { SignupData, SignupFormReq, SignupReq } from "../models/auth.model";
import { createSafeAction } from "../safe-action";

function isValidNickname(nickname: string) {
	return nickname.length > 0 && nickname.length <= 10 && /^[가-힣a-zA-Z0-9]+$/.test(nickname);
}

const ALLOWED_POSITIONS = new Set(["학생", "직장인", "일반인"]);

async function getKakaoLoginUrl({ next }: { next?: string } = {}) {
	const url = await fetchPublic<string>("/api/v1/auth/login-url?socialType=KAKAO", {
		method: "GET",
	});

	const safeNext = getSafeInternalPath(next);

	if (safeNext) {
		const cookieStore = await cookies();
		cookieStore.set("pendingNext", safeNext, {
			...AUTH_COOKIE_OPTIONS,
			maxAge: 60 * 5,
		});
	}

	return url;
}

async function checkNickname(nickname: string): Promise<boolean> {
	if (!isValidNickname(nickname)) throw new ApiError("닉네임 형식이 올바르지 않아요.", 400);

	return fetchPublic<boolean>(`/api/v1/user/nickname?nickname=${encodeURIComponent(nickname)}`, {
		method: "GET",
	});
}

async function signup(formData: SignupFormReq): Promise<SignupData> {
	const apiBaseUrl = process.env.API_BASE_URL;
	if (!apiBaseUrl) throw new Error("API_BASE_URL is not configured");

	if (!isValidNickname(formData.nickname)) {
		throw new ApiError("닉네임 형식이 올바르지 않아요.", 400);
	}

	if (!ALLOWED_POSITIONS.has(formData.positions)) {
		throw new ApiError("올바르지 않은 소속 값이에요.", 400);
	}

	const cookieStore = await cookies();
	const rawPendingSignup = cookieStore.get("pendingSignup")?.value;
	if (!rawPendingSignup) throw new ApiError("회원가입 세션이 만료되었어요.", 401);

	let email: string;
	try {
		const parsed = JSON.parse(rawPendingSignup) as { email?: unknown };
		if (typeof parsed.email !== "string" || parsed.email.length === 0) {
			throw new Error("Invalid pending signup cookie");
		}
		email = parsed.email;
	} catch {
		throw new ApiError("회원가입 세션이 올바르지 않아요.", 401);
	}

	const payload: SignupReq = { ...formData, email };

	const response = await fetch(`${apiBaseUrl}/api/v1/auth/sign-up`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		const body = await response.json().catch(() => null);
		const message =
			body && typeof body === "object" && "message" in body
				? String(body.message)
				: `API Error: ${response.status}`;
		throw new ApiError(message, response.status, body);
	}

	const body: ApiResponse<SignupData> = await response.json();

	applySetCookieHeaders(cookieStore, response.headers.getSetCookie());
	cookieStore.delete("pendingSignup");

	return body.data;
}

export const getKakaoLoginUrlAction = createSafeAction(getKakaoLoginUrl);
export const checkNicknameAction = createSafeAction(checkNickname);
export const signupAction = createSafeAction(signup);

export async function logoutAction() {
	try {
		await fetchServer("/api/v1/auth/logout", { method: "POST" });
	} catch (error) {
		console.error("[logout] 백엔드 로그아웃 실패:", error);
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
		console.error("[withdraw] 회원 탈퇴 실패:", error);
		return;
	}
	redirect("/");
}
