import { NextResponse } from "next/server";
import { hasAuthSession } from "@/common/api/auth-session";
import { fetchServer } from "@/common/api/fetch-server";
import type { FavoriteToolsRes } from "@/common/api/models/tool.model";

/**
 * @note 인증 쿠키가 HttpOnly라 브라우저가 Spring을 직접 부를 수 없어 이 통로를 둡니다.
 * 실패를 빈 목록으로 바꾸지 않습니다. 찜 버튼이 화면의 상태로 토글 방향을 정하므로,
 * 못 받은 걸 "찜 없음"으로 확정하면 이미 찜한 툴을 누른 사용자가 찜을 취소하게 됩니다.
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
		return NextResponse.json({ message: "찜 목록을 불러오지 못했습니다" }, { status: 502 });
	}
}
