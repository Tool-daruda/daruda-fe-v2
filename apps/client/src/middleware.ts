import { type NextRequest, NextResponse } from "next/server";
import {
	AUTH_COOKIE_OPTIONS,
	clearAuthCookies,
	forwardSetCookieHeaders,
	getCookieFromSetCookie,
} from "@/common/api/cookie-utils";

const AUTH_PROTECTED = ["/community/write", "/mypage", "/notification"];
const API_BASE_URL = process.env.API_BASE_URL;

function isAuthProtected(pathname: string) {
	if (AUTH_PROTECTED.some((route) => pathname.startsWith(route))) return true;
	if (/^\/community\/\d+\/edit/.test(pathname)) return true;
	return false;
}

function parseJwtExp(token: string): number | null {
	try {
		const parts = token.split(".");
		if (parts.length !== 3) return null;
		const base64Url = parts[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const pad = base64.length % 4;
		const padded = pad ? base64 + "=".repeat(4 - pad) : base64;
		const jsonStr =
			typeof atob === "function"
				? decodeURIComponent(
						atob(padded)
							.split("")
							.map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
							.join("")
					)
				: Buffer.from(padded, "base64").toString("utf-8");
		const payload = JSON.parse(jsonStr) as { exp?: number };
		return typeof payload.exp === "number" ? payload.exp : null;
	} catch {
		return null;
	}
}

function isTokenExpired(token: string): boolean {
	const exp = parseJwtExp(token);
	if (!exp) return true;
	return Date.now() >= exp * 1000 - 5000;
}

function redirectToLogin(request: NextRequest, shouldClearAuthCookies: boolean) {
	const { pathname } = request.nextUrl;
	const loginUrl = new URL("/login", request.url);
	loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
	const response = NextResponse.redirect(loginUrl);

	if (shouldClearAuthCookies) {
		clearAuthCookies(response.cookies);
	}

	return response;
}

async function reissueAccessToken(refreshToken: string) {
	if (!API_BASE_URL) return null;

	console.log(`[MIDDLEWARE REISSUE START] POST -> ${API_BASE_URL}/api/v1/auth/reissue`);

	try {
		const response = await fetch(`${API_BASE_URL}/api/v1/auth/reissue`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: `refreshToken=${refreshToken}`,
			},
		});

		if (!response.ok) {
			const errorText = await response.text().catch(() => "");
			console.error(
				`[MIDDLEWARE REISSUE FAILED] ${response.status} <- /api/v1/auth/reissue`,
				errorText
			);
			return null;
		}

		const setCookieHeaders = response.headers.getSetCookie();
		const body = (await response.json().catch(() => null)) as {
			data?: { accessToken?: string };
		} | null;

		const newAccessToken =
			getCookieFromSetCookie(setCookieHeaders, "accessToken") ?? body?.data?.accessToken ?? null;

		if (!newAccessToken) {
			console.error(`[MIDDLEWARE REISSUE FAILED] No accessToken found in response headers or body`);
			return null;
		}

		console.log(`[MIDDLEWARE REISSUE SUCCESS] New accessToken obtained`);
		return { accessToken: newAccessToken, setCookieHeaders };
	} catch (error) {
		console.error(`[MIDDLEWARE REISSUE ERROR]`, error);
		return null;
	}
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// 회원가입 플로우: pendingSignup 쿠키 필요
	if (pathname === "/signup") {
		const hasPendingSignup = request.cookies.has("pendingSignup");
		if (!hasPendingSignup) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
		return NextResponse.next();
	}

	// 인증 필요 페이지: accessToken 만료 여부 및 reissue 처리
	if (isAuthProtected(pathname)) {
		const accessToken = request.cookies.get("accessToken")?.value;
		const refreshToken = request.cookies.get("refreshToken")?.value;

		const hasValidAccessToken = accessToken && !isTokenExpired(accessToken);

		if (!hasValidAccessToken) {
			if (refreshToken) {
				const reissueResult = await reissueAccessToken(refreshToken);
				if (reissueResult) {
					const requestHeaders = new Headers(request.headers);
					const cookieMap = new Map(
						(requestHeaders.get("cookie") ?? "")
							.split("; ")
							.filter(Boolean)
							.map((c) => {
								const eqIdx = c.indexOf("=");
								return [c.slice(0, eqIdx).trim(), c.slice(eqIdx + 1)] as [string, string];
							})
					);
					cookieMap.set("accessToken", reissueResult.accessToken);
					requestHeaders.set(
						"cookie",
						[...cookieMap.entries()].map(([k, v]) => `${k}=${v}`).join("; ")
					);

					const response = NextResponse.next({
						request: {
							headers: requestHeaders,
						},
					});

					forwardSetCookieHeaders(response, reissueResult.setCookieHeaders);
					if (reissueResult.setCookieHeaders.length === 0) {
						response.cookies.set("accessToken", reissueResult.accessToken, AUTH_COOKIE_OPTIONS);
					}
					return response;
				}

				return redirectToLogin(request, true);
			}

			return redirectToLogin(request, false);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/signup",
		"/community/write",
		"/community/:id/edit",
		"/mypage/:path*",
		"/notification/:path*",
		"/notification",
		"/toollist/:path*",
		"/favoriteTools/:path*",
	],
};
