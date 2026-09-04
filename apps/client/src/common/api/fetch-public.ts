import { ApiError } from "./errors/api-error";
import type { FetchOptions } from "./fetch-server";
import { maskEndpoint } from "./mask-endpoint";
import type { ApiResponse } from "./models/api-response.model";

const SPRING_API_URL = process.env.API_BASE_URL;

// fetchServer와 같은 스위치입니다. 캐시가 붙은 뒤로는 업스트림 호출을 여기서 세야 합니다.
const isDev = process.env.NODE_ENV === "development" || process.env.DEBUG_FETCH_LOG === "1";

/**
 * 로그인 불필요한 공개 API 전용 fetcher.
 * 쿠키를 붙이지 않으므로 Next.js Data Cache가 사용자 구분 없이 공유됩니다.
 * 반드시 서버 컴포넌트 또는 Server Action 내에서만 호출하세요.
 */
export async function fetchPublic<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
	if (!SPRING_API_URL) {
		throw new Error("API_BASE_URL is not configured");
	}

	const { allowEmptyData = false, ...init } = options;

	const headers = new Headers({ "Content-Type": "application/json" });

	if (init.headers) {
		for (const [key, value] of new Headers(init.headers).entries()) {
			headers.set(key, value);
		}
	}

	try {
		const response = await fetch(`${SPRING_API_URL}${endpoint}`, {
			...init,
			headers,
		});

		if (!response.ok) {
			let errorMessage = `API Error: ${response.status}`;
			let errorBody: unknown = null;

			try {
				const text = await response.text();
				if (text) {
					const parsed = JSON.parse(text) as unknown;
					errorBody = parsed;
					if (parsed && typeof parsed === "object") {
						const obj = parsed as Record<string, unknown>;
						if (typeof obj.message === "string") errorMessage = obj.message;
						else if (typeof obj.error === "string") errorMessage = obj.error;
					}
				}
			} catch {
				errorMessage = `API Error: ${response.status}`;
			}

			throw new ApiError(errorMessage, response.status, errorBody);
		}

		const result: ApiResponse<T> = await response.json();

		// fetchServer와 같은 이유로 data 누락을 여기서 끊습니다.
		if (!allowEmptyData && (result.data === undefined || result.data === null)) {
			throw new ApiError(`응답에 data가 없습니다`, response.status, result);
		}

		if (isDev) {
			console.log(`[PUBLIC] ${response.status} <- ${maskEndpoint(endpoint)}`);
		}

		return result.data;
	} catch (error) {
		if (!(error instanceof ApiError)) {
			console.error(`[fetchPublic Error] ${maskEndpoint(endpoint)}:`, error);
		}
		throw error;
	}
}
