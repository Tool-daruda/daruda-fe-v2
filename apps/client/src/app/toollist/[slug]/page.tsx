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

	// 셸이 먼저 나가면 상태가 200으로 굳어 뒤늦은 notFound()가 먹지 않습니다.
	// 그래서 존재 확인만 응답 전에 끝냅니다. 하위 섹션이 이 결과를 재사용해 왕복은 늘지 않습니다.
	await getToolDetailOrNotFound(toolId);

	return <ToolDetailPage toolId={toolId} />;
}
