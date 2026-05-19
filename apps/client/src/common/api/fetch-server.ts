import { cookies } from "next/headers";
import type { ApiResponse } from "./models/api-response.model";

/**
 * @description Spring Boot API 서버와 통신하기 위한 서버 사이드 전용 Fetcher 유틸리티입니다.
 * @note 반드시 서버 컴포넌트(RSC) 또는 Server Action 내에서만 호출해야 합니다.
 */

const SPRING_API_URL = process.env.API_BASE_URL;

if (!SPRING_API_URL) {
	throw new Error("API_BASE_URL is not configured");
}

export async function fetchServer<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
	const cookieStore = await cookies();
	const token = cookieStore.get("access_token")?.value;

	const defaultHeaders: Record<string, string> = {
		"Content-Type": "application/json",
		...(token && { Authorization: `Bearer ${token}` }),
	};

	const mergedHeaders = new Headers(defaultHeaders);

	if (options.headers) {
		const customHeaders = new Headers(options.headers);
		customHeaders.forEach((value, key) => {
			mergedHeaders.set(key, value);
		});
	}

	console.log(`\n[FETCH START] ${options.method || "GET"} -> ${SPRING_API_URL}${endpoint}`);

	try {
		const response = await fetch(`${SPRING_API_URL}${endpoint}`, {
			...options,
			headers: mergedHeaders,
		});

		console.log(`[FETCH SUCCESS] ${response.status} <- ${endpoint}`);

		if (!response.ok) {
			const errorResponse = await response.json().catch(() => ({}));
			console.error(`[FETCH ERROR] ${response.status} <- ${endpoint}`);
			throw new Error(errorResponse.message || `API Error: ${response.status}`);
		}

		const result: ApiResponse<T> = await response.json();

		return result.data;
	} catch (error) {
		console.error(`[fetchServer Error] ${endpoint}:`, error);
		throw error;
	}
}
