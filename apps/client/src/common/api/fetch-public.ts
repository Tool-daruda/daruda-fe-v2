import { ApiError } from "./errors/api-error";
import type { ApiResponse } from "./models/api-response.model";

const SPRING_API_URL = process.env.API_BASE_URL;

/**
 * 로그인 불필요한 공개 API 전용 fetcher.
 * 쿠키를 붙이지 않으므로 Next.js Data Cache가 사용자 구분 없이 공유됩니다.
 * 반드시 서버 컴포넌트 또는 Server Action 내에서만 호출하세요.
 */
export async function fetchPublic<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
	if (!SPRING_API_URL) {
		throw new Error("API_BASE_URL is not configured");
	}

	const headers = new Headers({ "Content-Type": "application/json" });

	if (options.headers) {
		for (const [key, value] of new Headers(options.headers).entries()) {
			headers.set(key, value);
		}
	}

	try {
		const response = await fetch(`${SPRING_API_URL}${endpoint}`, {
			...options,
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

		if (process.env.NODE_ENV === "development") {
			console.log(`[PUBLIC] ${response.status} <- ${endpoint}`);
		}

		return result.data;
	} catch (error) {
		if (!(error instanceof ApiError)) {
			console.error(`[fetchPublic Error] ${endpoint}:`, error);
		}
		throw error;
	}
}
