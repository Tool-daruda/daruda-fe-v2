import { notFound } from "next/navigation";
import { ToolApi } from "@/common/api/tool-api";

/**
 * @description 툴 상세를 조회하고, 없거나 조회에 실패하면 404 페이지로 보냅니다.
 * @note 상세를 읽는 컴포넌트가 여럿이라 처리를 여기로 모읍니다. 한 곳만 notFound()를 부르면
 * 나머지가 ApiError를 던져 404 대신 에러 화면이 뜹니다.
 * 같은 렌더 패스 안의 동일 GET은 Next 요청 메모이제이션으로 한 번만 조회됩니다.
 */
export const getToolDetailOrNotFound = async (toolId: number) => {
	return ToolApi.getToolDetail(toolId).catch((error): never => {
		console.error(`[getToolDetailOrNotFound] 툴 정보 조회 실패 (ID: ${toolId}):`, error);
		notFound();
	});
};
