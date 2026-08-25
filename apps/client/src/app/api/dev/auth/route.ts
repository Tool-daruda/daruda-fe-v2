import { type NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_OPTIONS, clearAuthCookies } from "@/common/api/cookie-utils";

// 카카오 redirect_uri가 배포 도메인으로 고정되어 있어 로컬에서는 로그인 플로우를 탈 수 없습니다.
// 배포 사이트에서 복사한 토큰을 HttpOnly 쿠키로 심어주는 개발 전용 통로이며,
// 배포 환경에서는 라우트 자체가 없는 것처럼 404를 돌려줍니다.
const IS_DEV = process.env.NODE_ENV !== "production";

const notFound = () => new NextResponse(null, { status: 404 });

// 토큰의 실제 유효기간은 JWT exp가 결정하므로, 쿠키는 브라우저를 닫아도 남을 만큼만 살려둡니다.
const DEV_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export async function POST(request: NextRequest) {
	if (!IS_DEV) return notFound();

	const body = (await request.json().catch(() => null)) as {
		accessToken?: string;
		refreshToken?: string;
	} | null;

	const accessToken = body?.accessToken?.trim();
	const refreshToken = body?.refreshToken?.trim();

	if (!accessToken) {
		return NextResponse.json({ message: "accessToken을 입력해주세요." }, { status: 400 });
	}

	const response = NextResponse.json({ message: "인증 쿠키를 심었습니다." });
	const cookieOptions = { ...AUTH_COOKIE_OPTIONS, maxAge: DEV_COOKIE_MAX_AGE };

	response.cookies.set("accessToken", accessToken, cookieOptions);

	if (refreshToken) {
		response.cookies.set("refreshToken", refreshToken, cookieOptions);
	}

	return response;
}

export async function DELETE() {
	if (!IS_DEV) return notFound();

	const response = NextResponse.json({ message: "인증 쿠키를 지웠습니다." });
	clearAuthCookies(response.cookies);

	return response;
}
