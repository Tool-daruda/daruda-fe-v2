import { cookies } from "next/headers";
import type { ApiResponse } from "./models/api-response.model";

/**
 * @description Spring Boot API 서버와 통신하기 위한 서버 사이드 전용 Fetcher 유틸리티입니다.
 * @note 반드시 서버 컴포넌트(RSC) 또는 Server Action 내에서만 호출해야 합니다.
 */

const SPRING_API_URL = process.env.API_BASE_URL;

export async function fetchServer<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
	if (!SPRING_API_URL) {
		throw new Error("API_BASE_URL is not configured");
	}

	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;
	const cookieHeader = [
		accessToken && `accessToken=${accessToken}`,
		refreshToken && `refreshToken=${refreshToken}`,
	]
		.filter(Boolean)
		.join("; ");

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
		const response = await fetch(`${SPRING_API_URL}${endpoint}`, {
			...options,
			headers: mergedHeaders,
		});

		if (!response.ok) {
			const errorResponse = await response.json().catch(() => ({}));
			console.error(`[FETCH ERROR] ${response.status} <- ${endpoint}`);
			console.error("[FETCH ERROR BODY]", errorResponse);
			throw new Error(errorResponse.message || `API Error: ${response.status}`);
		}

		console.log(`[FETCH SUCCESS] ${response.status} <- ${endpoint}`);

		const result: ApiResponse<T> = await response.json();

		return result.data;
	} catch (error) {
		console.error(`[fetchServer Error] ${endpoint}:`, error);
		throw error;
	}
}
