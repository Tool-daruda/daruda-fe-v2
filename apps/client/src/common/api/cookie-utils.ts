import type { NextRequest, NextResponse } from "next/server";

// 로컬(localhost)에는 .daruda.shop 쿠키를 심을 수도, 읽을 수도 없습니다.
// .env에 COOKIE_DOMAIN이 남아 있어도 개발 환경에서는 host-only로 강제합니다.
const COOKIE_DOMAIN = process.env.NODE_ENV === "production" ? process.env.COOKIE_DOMAIN : undefined;

const BASE_COOKIE_OPTIONS = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "lax" as const,
	path: "/",
};

// accessToken/refreshToken은 admin 등 다른 서브도메인에서도 api 서버로 실려가야 하므로
// COOKIE_DOMAIN(.daruda.shop)을 붙여 상위 도메인 쿠키로 심습니다.
// 로컬은 COOKIE_DOMAIN 미설정 → host-only로 동작합니다.
export const AUTH_COOKIE_OPTIONS = {
	...BASE_COOKIE_OPTIONS,
	...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
};

// pendingNext/pendingSignup은 client 앱 안에서만 쓰이는 임시 쿠키라 host-only로 둡니다.
export const TEMP_COOKIE_OPTIONS = BASE_COOKIE_OPTIONS;

const AUTH_COOKIE_NAMES = ["accessToken", "refreshToken"] as const;

interface CookieSetOptions {
	httpOnly?: boolean;
	secure?: boolean;
	sameSite?: "lax" | "strict" | "none";
	path?: string;
	maxAge?: number;
	domain?: string;
}

type WritableCookieStore = {
	set(name: string, value: string, options?: CookieSetOptions): unknown;
	delete(options: { name: string; path?: string; domain?: string }): unknown;
};

export function getSafeInternalPath(path?: string) {
	if (!path || !path.startsWith("/") || path.startsWith("//")) return undefined;
	return path;
}

export function createCookieHeader(accessToken?: string, refreshToken?: string) {
	return [
		accessToken && `accessToken=${accessToken}`,
		refreshToken && `refreshToken=${refreshToken}`,
	]
		.filter(Boolean)
		.join("; ");
}

interface ParsedSetCookie {
	name: string;
	value: string;
	maxAge?: number;
}

function parseSetCookieHeader(header: string): ParsedSetCookie | null {
	const eqIdx = header.indexOf("=");
	if (eqIdx === -1) return null;

	const name = header.slice(0, eqIdx).trim();
	const rest = header.slice(eqIdx + 1);
	const [value, ...attrs] = rest.split("; ");

	const maxAgePart = attrs.find((a) => a.toLowerCase().startsWith("max-age="));
	const maxAge = maxAgePart ? parseInt(maxAgePart.split("=")[1], 10) : undefined;

	return { name, value: value.trim(), maxAge };
}

export function getCookieFromSetCookie(setCookieHeaders: string[], targetName: string) {
	for (const header of setCookieHeaders) {
		const parsed = parseSetCookieHeader(header);
		if (parsed?.name === targetName) return parsed.value;
	}
	return undefined;
}

export function applySetCookieHeaders(store: WritableCookieStore, setCookieHeaders: string[]) {
	for (const header of setCookieHeaders) {
		const parsed = parseSetCookieHeader(header);
		if (!parsed) continue;

		store.set(parsed.name, parsed.value, {
			...AUTH_COOKIE_OPTIONS,
			...(parsed.maxAge !== undefined && { maxAge: parsed.maxAge }),
		});
	}
}

// 도메인 쿠키는 domain을 지정해야 삭제됩니다.
// ResponseCookies는 이름만 Map 키로 쓰므로 같은 이름을 두 번 지워도 헤더는 하나만 남습니다.
// host-only 변형 정리는 raw 헤더를 쓸 수 있는 clearLegacyHostOnlyCookies가 담당합니다.
export function clearAuthCookies(store: WritableCookieStore) {
	for (const name of AUTH_COOKIE_NAMES) {
		store.delete(COOKIE_DOMAIN ? { name, path: "/", domain: COOKIE_DOMAIN } : { name, path: "/" });
	}
}

// COOKIE_DOMAIN이 설정된 환경에서 host-only 인증 쿠키는 이 변경 이전에 심긴 것뿐이므로
// 항상 정리 대상입니다. Domain 없는 삭제 헤더는 host-only 쿠키만 지우고
// 상위 도메인 쿠키는 건드리지 않습니다.
//
// ResponseCookies 조작은 set-cookie 헤더를 통째로 재작성하므로,
// 반드시 쿠키 조작을 모두 마친 뒤 마지막에 호출해야 합니다.
export function clearLegacyHostOnlyCookies(
	request: NextRequest,
	response: NextResponse
): NextResponse {
	if (!COOKIE_DOMAIN) return response;

	// 인증 쿠키를 들고 온 요청에만 붙입니다.
	// 비로그인 트래픽까지 Set-Cookie가 붙으면 불필요하게 캐시가 깨집니다.
	const hasAuthCookie = AUTH_COOKIE_NAMES.some((name) => request.cookies.has(name));
	if (!hasAuthCookie) return response;

	for (const name of AUTH_COOKIE_NAMES) {
		response.headers.append(
			"set-cookie",
			`${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
		);
	}

	return response;
}

export function forwardSetCookieHeaders(
	response: NextResponse,
	setCookieHeaders: string[]
): NextResponse {
	applySetCookieHeaders(response.cookies, setCookieHeaders);
	return response;
}
