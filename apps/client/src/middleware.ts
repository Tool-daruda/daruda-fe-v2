import { type NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/community/write", "/mypage"];

function isProtected(pathname: string) {
	if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) return true;
	// /community/:id/edit
	if (/^\/community\/\d+\/edit/.test(pathname)) return true;
	return false;
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const accessToken = request.cookies.get("accessToken")?.value;

	if (isProtected(pathname) && !accessToken) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("next", pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/community/write",
		"/community/:id/edit",
		"/mypage/:path*",
		"/toollist/:path*",
		"/favoriteTools/:path*",
	],
};
