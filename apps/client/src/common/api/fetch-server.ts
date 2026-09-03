import { cookies } from "next/headers";
import {
	AUTH_COOKIE_OPTIONS,
	applySetCookieHeaders,
	clearAuthCookies,
	createCookieHeader,
	getCookieFromSetCookie,
} from "./cookie-utils";
import { ApiError } from "./errors/api-error";
import { maskEndpoint } from "./mask-endpoint";
import type { ApiResponse } from "./models/api-response.model";
import type { ReissueData } from "./models/auth.model";

/**
 * @description Spring Boot API 서버와 통신하기 위한 서버 사이드 전용 Fetcher 유틸리티입니다.
 * @note 반드시 서버 컴포넌트(RSC) 또는 Server Action 내에서만 호출해야 합니다.
 */

const SPRING_API_URL = process.env.API_BASE_URL;

const AUTH_REISSUE_ENDPOINT = "/api/v1/auth/reissue";

// 성공 로그는 개발용입니다. 실패 로그는 프로덕션에서도 남깁니다.
// DEBUG_FETCH_LOG=1은 프로덕션 빌드에서 업스트림 호출을 셀 때 씁니다.
const isDev = process.env.NODE_ENV === "development" || process.env.DEBUG_FETCH_LOG === "1";

export type FetchOptions = RequestInit & {
	/** 200에 `data`가 없어도 통과시킵니다. 본문을 안 주는 뮤테이션에만 씁니다. */
	allowEmptyData?: boolean;
};

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

// 서버 컴포넌트 렌더 중에는 응답 쿠키를 쓸 수 없어 조용히 실패합니다.
// 실제로 지워지는 건 Server Action / Route Handler에서 호출됐을 때입니다.
async function clearAuthCookiesSafely() {
	try {
		const cookieStore = await cookies();
		clearAuthCookies(cookieStore);
	} catch {
		// Server Components cannot mutate response cookies.
	}
}

async function reissueAccessToken(refreshToken: string) {
	if (!SPRING_API_URL) return null;

	if (isDev) console.log(`[FETCH REISSUE START] POST -> ${SPRING_API_URL}${AUTH_REISSUE_ENDPOINT}`);

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
			await clearAuthCookiesSafely();
			return null;
		}

		const setCookieHeaders = response.headers.getSetCookie();
		await persistSetCookieHeaders(setCookieHeaders);

		const body: ApiResponse<ReissueData> = await response.json();
		const accessToken =
			getCookieFromSetCookie(setCookieHeaders, "accessToken") ?? body?.data?.accessToken;

		if (!accessToken) {
			console.error(`[FETCH REISSUE FAILED] No accessToken found in response headers or body`);
			// 재발급이 성공 응답을 줬는데 토큰이 없으면 세션을 이어갈 수 없으므로 정리합니다.
			// (네트워크/파싱 예외는 일시적일 수 있어 catch에서는 쿠키를 지우지 않습니다.)
			await clearAuthCookiesSafely();
			return null;
		}

		if (isDev) console.log(`[FETCH REISSUE SUCCESS] New accessToken obtained`);

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

	// 404(리소스 없음), 401(비로그인)은 정상적으로 발생할 수 있는 응답이므로 warn으로 처리하고,
	// 그 외는 error로 처리
	const isExpectedStatus = response.status === 404 || response.status === 401;
	const log = isExpectedStatus ? console.warn : console.error;
	log(`[FETCH ERROR] ${response.status} <- ${maskEndpoint(endpoint)}`, errorBody);

	throw new ApiError(errorMessage, response.status, errorBody);
}

export async function fetchServer<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
	if (!SPRING_API_URL) {
		throw new Error("API_BASE_URL is not configured");
	}

	const { allowEmptyData = false, ...init } = options;

	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;
	const mergedHeaders = createHeaders(init, createCookieHeader(accessToken, refreshToken));

	// 헤더 순회와 JSON.stringify가 요청마다 도니 개발에서만 찍습니다.
	if (isDev) {
		console.log(
			`\n[FETCH START] ${init.method || "GET"} -> ${SPRING_API_URL}${maskEndpoint(endpoint)}`
		);
		console.log("[FETCH COOKIE]", {
			hasAccessToken: Boolean(accessToken),
			hasRefreshToken: Boolean(refreshToken),
		});

		console.log(`\n=================== [FETCH REQUEST] ===================`);
		console.log(`▶ URL    : [${init.method || "GET"}] ${SPRING_API_URL}${maskEndpoint(endpoint)}`);

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

		if (init.body && !endpoint.startsWith("/api/v1/auth")) {
			try {
				const parsedBody = JSON.parse(init.body as string);
				console.log(`▶ PAYLOAD:\n`, JSON.stringify(parsedBody, null, 2));
			} catch {
				console.log(`▶ PAYLOAD:`, init.body);
			}
		} else if (init.body) {
			console.log(`▶ PAYLOAD: [REDACTED]`);
		} else {
			console.log(`▶ PAYLOAD: None`);
		}
		console.log(`=======================================================\n`);
	}

	try {
		let response = await fetch(`${SPRING_API_URL}${endpoint}`, {
			...init,
			headers: mergedHeaders,
		});

		if (response.status === 401 && endpoint !== AUTH_REISSUE_ENDPOINT) {
			if (refreshToken) {
				const reissuedAccessToken = await reissueAccessToken(refreshToken);
				if (reissuedAccessToken) {
					response = await fetch(`${SPRING_API_URL}${endpoint}`, {
						...init,
						headers: createHeaders(init, createCookieHeader(reissuedAccessToken, refreshToken)),
					});
				}
			} else if (accessToken) {
				// refreshToken이 없으면 재발급 자체가 불가능하므로 되살릴 수 없는 세션입니다.
				// 남겨두면 hasAuthSession()이 쿠키 존재만 보고 로그인 상태로 판정해 401만 반복됩니다.
				console.warn("[FETCH AUTH] refreshToken 없이 401 → 남은 accessToken을 정리합니다.");
				await clearAuthCookiesSafely();
			}
		}

		if (!response.ok) {
			await parseErrorResponse(response, endpoint);
		}

		if (isDev) console.log(`[FETCH SUCCESS] ${response.status} <- ${maskEndpoint(endpoint)}`);

		const result: ApiResponse<T> = await response.json();

		// ApiResponse는 `data: T`라고 선언하지만 서버가 빠뜨릴 수 있습니다.
		// 여기서 안 끊으면 undefined가 화면까지 흘러가 어디가 문제인지 안 보입니다.
		if (!allowEmptyData && (result.data === undefined || result.data === null)) {
			throw new ApiError(`응답에 data가 없습니다`, response.status, result);
		}

		if (isDev) {
			console.log(`⬅️ RESPONSE:`, JSON.stringify(result.data, null, 2));
		}

		return result.data;
	} catch (error) {
		if (!(error instanceof ApiError)) {
			console.error(`[fetchServer Network Error] ${maskEndpoint(endpoint)}:`, error);
		}
		throw error;
	}
}
