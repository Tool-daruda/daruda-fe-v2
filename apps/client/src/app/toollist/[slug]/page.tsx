import { notFound } from "next/navigation";
import { ToolDetailPage } from "./_components/tool-detail-page";
import { getToolDetail } from "./_lib/get-tool-details";

type PageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export default async function ToolDetailRoute(props: PageProps) {
	const params = await props.params;
	const toolDetail = await getToolDetail(params.slug);

	if (!toolDetail) {
		notFound();
	}

	return <ToolDetailPage toolDetail={toolDetail} />;
}
