import type { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import type { NextResponse } from "next/server";

export const AUTH_COOKIE_OPTIONS = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "lax" as const,
	path: "/",
};

export function getSafeInternalPath(path?: string) {
	if (!path || !path.startsWith("/") || path.startsWith("//")) return undefined;
	return path;
}

function parseMaxAge(attrs: string[]) {
	const maxAgePart = attrs.find((a) => a.toLowerCase().startsWith("max-age="));
	return maxAgePart ? parseInt(maxAgePart.split("=")[1], 10) : undefined;
}

export function getCookieFromSetCookie(setCookieHeaders: string[], targetName: string) {
	for (const header of setCookieHeaders) {
		const eqIdx = header.indexOf("=");
		if (eqIdx === -1) continue;

		const name = header.slice(0, eqIdx).trim();
		if (name !== targetName) continue;

		const rest = header.slice(eqIdx + 1);
		const [value] = rest.split("; ");
		return value.trim();
	}
}

type WritableCookieStore = Pick<ResponseCookies, "set">;

export function applySetCookieHeaders(store: WritableCookieStore, setCookieHeaders: string[]) {
	for (const header of setCookieHeaders) {
		const eqIdx = header.indexOf("=");
		if (eqIdx === -1) continue;

		const name = header.slice(0, eqIdx).trim();
		const rest = header.slice(eqIdx + 1);
		const [value, ...attrs] = rest.split("; ");
		const maxAge = parseMaxAge(attrs);

		store.set(name, value.trim(), {
			...AUTH_COOKIE_OPTIONS,
			...(maxAge !== undefined && { maxAge }),
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
