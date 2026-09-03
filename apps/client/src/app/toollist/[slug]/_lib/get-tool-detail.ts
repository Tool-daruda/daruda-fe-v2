import { notFound } from "next/navigation";
import { ApiError } from "@/common/api/errors/api-error";
import { ToolApi } from "@/common/api/tool-api";

/**
 * @description 툴 상세를 조회하고, 존재하지 않으면(404) 404 페이지로 보냅니다.
 * @note 상세를 읽는 컴포넌트가 여럿이라 처리를 여기로 모읍니다. 한 곳만 notFound()를 부르면
 * 나머지가 ApiError를 던져 404 대신 에러 화면이 뜹니다.
 * 같은 렌더 패스 안의 동일 GET은 Next 요청 메모이제이션으로 한 번만 조회됩니다.
 */
export const getToolDetailOrNotFound = async (toolId: number) => {
	return ToolApi.getToolDetail(toolId).catch((error: unknown): never => {
		// 404만 "없는 툴"이다. 네트워크 오류나 5xx까지 404로 바꾸면
		// 일시적 장애가 "툴이 사라졌다"로 색인된다. 나머지는 에러 바운더리로 넘긴다.
		if (error instanceof ApiError && error.status === 404) {
			notFound();
		}

		throw error;
	});
};
