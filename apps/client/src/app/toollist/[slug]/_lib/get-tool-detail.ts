import { notFound } from "next/navigation";
import { ApiError } from "@/common/api/errors/api-error";
import { ToolApi } from "@/common/api/tool-api";

/**
 * @description 툴 상세를 조회하고, 없는 툴이면 404 페이지로 보냅니다.
 * @note 상세를 읽는 곳이 다섯 군데라 한 곳만 notFound()를 부르면 나머지가
 * ApiError를 던져 404 대신 에러 화면이 뜹니다. 그래서 여기로 모았습니다.
 */
export const getToolDetailOrNotFound = async (toolId: number) => {
	return ToolApi.getToolDetail(toolId).catch((error: unknown): never => {
		// 5xx나 네트워크 오류까지 404로 바꾸면 잠깐의 장애가 "툴이 사라졌다"로 색인됩니다.
		if (error instanceof ApiError && error.status === 404) {
			notFound();
		}

		throw error;
	});
};
