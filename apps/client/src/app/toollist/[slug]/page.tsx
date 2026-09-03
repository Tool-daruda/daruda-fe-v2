import { notFound } from "next/navigation";
import { ToolDetailPage } from "./_components/tool-detail-page";
import { getToolDetailOrNotFound } from "./_lib/get-tool-detail";

type PageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export default async function ToolDetailRoute(props: PageProps) {
	const params = await props.params;
	const toolId = Number(params.slug);

	if (Number.isNaN(toolId)) notFound();

	// 존재 검증은 응답이 나가기 전에 끝나야 404 상태 코드가 유지됩니다.
	// loading.tsx나 상위 Suspense로 셸을 먼저 흘리면 상태가 200으로 굳고
	// 없는 툴이 200 + not-found 화면으로 나갑니다(카탈로그라 SEO에 그대로 반영됨).
	//
	// 이 await는 요청 메모이제이션 덕에 하위 섹션들이 그대로 재사용하므로
	// 왕복이 늘지는 않습니다. 나머지 조회는 ToolDetailPage 안에서 스트리밍합니다.
	await getToolDetailOrNotFound(toolId);

	return <ToolDetailPage toolId={toolId} />;
}
