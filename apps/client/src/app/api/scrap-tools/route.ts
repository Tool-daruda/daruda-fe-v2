import { NextResponse } from "next/server";
import { hasAuthSession } from "@/common/api/auth-session";
import { fetchServer } from "@/common/api/fetch-server";
import type { FavoriteToolsRes } from "@/common/api/models/tool.model";

/**
 * @note 인증 쿠키가 HttpOnly라 브라우저가 Spring을 직접 부를 수 없어 이 통로를 둡니다.
 * 실패해도 화면을 막지 않도록 빈 목록으로 떨어뜨립니다.
 */
export async function GET() {
	if (!(await hasAuthSession())) {
		return NextResponse.json({ toolIds: [] });
	}

	try {
		const { toolList } = await fetchServer<FavoriteToolsRes>("/api/v1/user/scrap-tools", {
			method: "GET",
			cache: "no-store",
		});

		return NextResponse.json({ toolIds: toolList.map((tool) => tool.toolId) });
	} catch {
		return NextResponse.json({ toolIds: [] });
	}
}
