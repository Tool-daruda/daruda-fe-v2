import type { NextResponse } from "next/server";

const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;

// accessToken/refreshToken은 admin 등 다른 서브도메인에서도 api 서버로 실려가야 하므로
// COOKIE_DOMAIN(.daruda.shop)을 붙여 상위 도메인 쿠키로 심습니다.
// 로컬은 COOKIE_DOMAIN 미설정 → host-only로 동작합니다.
export const AUTH_COOKIE_OPTIONS = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "lax" as const,
	path: "/",
	...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
};

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

export function forwardSetCookieHeaders(
	response: NextResponse,
	setCookieHeaders: string[]
): NextResponse {
	applySetCookieHeaders(response.cookies, setCookieHeaders);
	return response;
}
