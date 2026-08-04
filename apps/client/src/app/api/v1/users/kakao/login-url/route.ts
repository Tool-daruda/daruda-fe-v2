import { type NextRequest, NextResponse } from "next/server";
import {
	AUTH_COOKIE_OPTIONS,
	forwardSetCookieHeaders,
	getSafeInternalPath,
} from "@/common/api/cookie-utils";
import type { ApiResponse } from "@/common/api/models/api-response.model";
import type { LoginData } from "@/common/api/models/auth.model";

const API_BASE_URL = process.env.API_BASE_URL;

export async function GET(request: NextRequest) {
	const code = request.nextUrl.searchParams.get("code");

	if (!code) {
		return NextResponse.redirect(new URL("/login?error=no_code", request.url));
	}

	if (!API_BASE_URL) {
		return NextResponse.redirect(new URL("/login?error=config", request.url));
	}

	try {
		const loginResponse = await fetch(
			`${API_BASE_URL}/api/v1/auth/login?code=${encodeURIComponent(code)}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ socialType: "KAKAO" }),
			}
		);

		if (!loginResponse.ok) {
			return NextResponse.redirect(new URL("/login?error=auth_failed", request.url));
		}

		const body: ApiResponse<LoginData> = await loginResponse.json();
		const loginData = body.data;

		const pendingNext = getSafeInternalPath(request.cookies.get("pendingNext")?.value);
		const redirectTo = loginData.isUser ? pendingNext || "/" : "/signup";

		const response = NextResponse.redirect(new URL(redirectTo, request.url));

		forwardSetCookieHeaders(response, loginResponse.headers.getSetCookie());
		response.cookies.delete("pendingNext");

		if (!loginData.isUser) {
			response.cookies.set("pendingSignup", JSON.stringify({ email: loginData.email }), {
				...AUTH_COOKIE_OPTIONS,
				maxAge: 60 * 10,
			});
		}

		return response;
	} catch (error) {
		console.error("[kakao/login-url] 처리 실패:", error);
		return NextResponse.redirect(new URL("/login?error=server_error", request.url));
	}
}
