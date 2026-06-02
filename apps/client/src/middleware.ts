import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	// const accessToken = request.cookies.get("accessToken")?.value;
	const API_URL = process.env.API_BASE_URL;

	const isTokenExpired = false;

	if (isTokenExpired && API_URL) {
		try {
			const response = await fetch(`${API_URL}/api/v1/auth/reissue`, {
				method: "POST",
				headers: {},
			});

			if (response.ok) {
				const resData = await response.json();
				const nextResponse = NextResponse.next();

				nextResponse.cookies.set("accessToken", resData.data.accessToken, {
					httpOnly: true,
					path: "/",
				});
				return nextResponse;
			}
		} catch (error) {
			console.error("미들웨어 토큰 재발급 실패:", error);
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/toollist/:path*", "/favoriteTools/:path*"],
};
