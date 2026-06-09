import { notFound } from "next/navigation";
import { ToolApi } from "@/common/api/tool-api";
import { ToolDetailPage } from "./_components/tool-detail-page";

type PageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export default async function ToolDetailRoute(props: PageProps) {
	const params = await props.params;
	const toolId = Number(params.slug);

	if (Number.isNaN(toolId)) notFound();

	try {
		const info = await ToolApi.getToolDetail(toolId);
		if (!info) notFound();

		return <ToolDetailPage toolId={toolId} />;
	} catch (error) {
		console.error(`[Page Error] 툴 정보 검증 실패 (ID: ${toolId}):`, error);
		notFound();
	}
}
