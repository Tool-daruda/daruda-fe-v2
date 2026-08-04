import { cookies } from "next/headers";
import {
	AUTH_COOKIE_OPTIONS,
	applySetCookieHeaders,
	createCookieHeader,
	getCookieFromSetCookie,
} from "./cookie-utils";
import { ApiError } from "./errors/api-error";
import type { ApiResponse } from "./models/api-response.model";
import type { ReissueData } from "./models/auth.model";

/**
 * @description Spring Boot API 서버와 통신하기 위한 서버 사이드 전용 Fetcher 유틸리티입니다.
 * @note 반드시 서버 컴포넌트(RSC) 또는 Server Action 내에서만 호출해야 합니다.
 */

const SPRING_API_URL = process.env.API_BASE_URL;

const AUTH_REISSUE_ENDPOINT = "/api/v1/auth/reissue";

function createHeaders(options: RequestInit, cookieHeader: string) {
	const defaultHeaders: Record<string, string> = {
		"Content-Type": "application/json",
		...(cookieHeader && { Cookie: cookieHeader }),
	};

	const mergedHeaders = new Headers(defaultHeaders);

	if (options.headers) {
		const customHeaders = new Headers(options.headers);
		customHeaders.forEach((value, key) => {
			mergedHeaders.set(key, value);
		});
	}

	return mergedHeaders;
}

async function persistSetCookieHeaders(setCookieHeaders: string[]) {
	const cookieStore = await cookies();

	try {
		applySetCookieHeaders(cookieStore, setCookieHeaders);
	} catch {
		// Server Components cannot mutate response cookies. The retry still uses the new token.
	}
}

async function reissueAccessToken(refreshToken?: string) {
	if (!refreshToken || !SPRING_API_URL) return null;

	console.log(`[FETCH REISSUE START] POST -> ${SPRING_API_URL}${AUTH_REISSUE_ENDPOINT}`);

	try {
		const response = await fetch(`${SPRING_API_URL}${AUTH_REISSUE_ENDPOINT}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: `refreshToken=${refreshToken}`,
			},
		});

		if (!response.ok) {
			const errorText = await response.text().catch(() => "");
			console.error(
				`[FETCH REISSUE FAILED] ${response.status} <- ${AUTH_REISSUE_ENDPOINT}`,
				errorText
			);
			try {
				const cookieStore = await cookies();
				cookieStore.delete("accessToken");
				cookieStore.delete("refreshToken");
			} catch {
				// Server Components cannot mutate response cookies.
			}
			return null;
		}

		const setCookieHeaders = response.headers.getSetCookie();
		await persistSetCookieHeaders(setCookieHeaders);

		const body: ApiResponse<ReissueData> = await response.json();
		const accessToken =
			getCookieFromSetCookie(setCookieHeaders, "accessToken") ?? body?.data?.accessToken;

		if (!accessToken) {
			console.error(`[FETCH REISSUE FAILED] No accessToken found in response headers or body`);
			return null;
		}

		console.log(`[FETCH REISSUE SUCCESS] New accessToken obtained`);

		if (accessToken && setCookieHeaders.length === 0) {
			try {
				const cookieStore = await cookies();
				cookieStore.set("accessToken", accessToken, AUTH_COOKIE_OPTIONS);
			} catch {
				// Server Components cannot mutate response cookies. The retry still uses the new token.
			}
		}

		return accessToken;
	} catch (error) {
		console.error(`[FETCH REISSUE ERROR]`, error);
		return null;
	}
}

async function parseErrorResponse(response: Response, endpoint: string) {
	let errorMessage = `API Error: ${response.status}`;
	let errorBody: unknown = null;

	try {
		const responseText = await response.text();

		if (responseText) {
			const parsed: unknown = JSON.parse(responseText);
			errorBody = parsed;

			if (parsed && typeof parsed === "object") {
				const obj = parsed as Record<string, unknown>;
				if (typeof obj.message === "string") errorMessage = obj.message;
				else if (typeof obj.error === "string") errorMessage = obj.error;
			}
		}
	} catch {
		errorMessage = `API Error: ${response.status} (Failed to parse error response)`;
	}

	// 404는 "리소스 없음"이라는 정상 응답이므로 warn으로 처리하고, 그 외는 error로 처리
	const log = response.status === 404 ? console.warn : console.error;
	log(`[FETCH ERROR] ${response.status} <- ${endpoint}`, errorBody);

	throw new ApiError(errorMessage, response.status, errorBody);
}

export async function fetchServer<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
	if (!SPRING_API_URL) {
		throw new Error("API_BASE_URL is not configured");
	}

	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;
	const mergedHeaders = createHeaders(options, createCookieHeader(accessToken, refreshToken));

	console.log(`\n[FETCH START] ${options.method || "GET"} -> ${SPRING_API_URL}${endpoint}`);
	console.log("[FETCH COOKIE]", {
		hasAccessToken: Boolean(accessToken),
		hasRefreshToken: Boolean(refreshToken),
	});

	console.log(`\n=================== [FETCH REQUEST] ===================`);
	console.log(`▶ URL    : [${options.method || "GET"}] ${SPRING_API_URL}${endpoint}`);

	const headersObj: Record<string, string> = {};
	mergedHeaders.forEach((value, key) => {
		headersObj[key] = value;
	});
	const redactedHeaders = {
		...headersObj,
		cookie: headersObj.cookie ? "[REDACTED]" : undefined,
		authorization: headersObj.authorization ? "[REDACTED]" : undefined,
	};
	console.log(`▶ HEADERS:`, redactedHeaders);

	if (options.body && !endpoint.startsWith("/api/v1/auth")) {
		try {
			const parsedBody = JSON.parse(options.body as string);
			console.log(`▶ PAYLOAD:\n`, JSON.stringify(parsedBody, null, 2));
		} catch {
			console.log(`▶ PAYLOAD:`, options.body);
		}
	} else if (options.body) {
		console.log(`▶ PAYLOAD: [REDACTED]`);
	} else {
		console.log(`▶ PAYLOAD: None`);
	}
	console.log(`=======================================================\n`);

	try {
		let response = await fetch(`${SPRING_API_URL}${endpoint}`, {
			...options,
			headers: mergedHeaders,
		});

		if (response.status === 401 && endpoint !== AUTH_REISSUE_ENDPOINT) {
			const reissuedAccessToken = await reissueAccessToken(refreshToken);
			if (reissuedAccessToken) {
				response = await fetch(`${SPRING_API_URL}${endpoint}`, {
					...options,
					headers: createHeaders(options, createCookieHeader(reissuedAccessToken, refreshToken)),
				});
			}
		}

		if (!response.ok) {
			await parseErrorResponse(response, endpoint);
		}

		console.log(`[FETCH SUCCESS] ${response.status} <- ${endpoint}`);

		const result: ApiResponse<T> = await response.json();

		if (process.env.NODE_ENV === "development") {
			console.log(`⬅️ RESPONSE:`, JSON.stringify(result.data, null, 2));
		}

		return result.data;
	} catch (error) {
		if (!(error instanceof ApiError)) {
			console.error(`[fetchServer Network Error] ${endpoint}:`, error);
		}
		throw error;
	}
}
