import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { createCookieHeader } from "@/common/api/cookie-utils";

const API_BASE_URL = process.env.API_BASE_URL;

export async function GET(request: NextRequest) {
	if (!API_BASE_URL) {
		return new Response("API_BASE_URL is not configured", { status: 500 });
	}

	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;

	if (!accessToken && !refreshToken) {
		return new Response("Unauthorized", { status: 401 });
	}

	const lastEventId =
		request.headers.get("Last-Event-ID") ?? request.nextUrl.searchParams.get("lastEventId");
	const headers: Record<string, string> = {
		Accept: "text/event-stream",
		Cookie: createCookieHeader(accessToken, refreshToken),
	};

	if (lastEventId) {
		headers["Last-Event-ID"] = lastEventId;
	}

	try {
		const backendResponse = await fetch(`${API_BASE_URL}/api/v1/notification/connect`, {
			method: "GET",
			headers,
		});

		if (!backendResponse.ok || !backendResponse.body) {
			return new Response(`Backend Error: ${backendResponse.status}`, {
				status: backendResponse.status,
			});
		}

		return new Response(backendResponse.body, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache, no-transform",
				Connection: "keep-alive",
			},
		});
	} catch (error) {
		console.error("[SSE Proxy Error]", error);
		return new Response("SSE Proxy Connection Failed", { status: 502 });
	}
}
