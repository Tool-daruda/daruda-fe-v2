import { type ActionFunctionArgs, type LoaderFunctionArgs, redirect } from "react-router-dom";
import { ToolEditForm } from "@/features/tool-edit-form";

export async function loader({ params }: LoaderFunctionArgs) {
	const { toolId } = params;
	// const toolData = await getTool(toolId!);

	const toolData = { id: toolId, name: "기존 툴 이름" };

	if (!toolData) {
		throw new Response("Not Found", { status: 404 });
	}
	return { toolData };
}

export async function action({ request, params }: ActionFunctionArgs) {
	const { toolId } = params;
	const jsonData = await request.json();
	const { intent, ...formData } = jsonData;

	if (intent === "draft") {
		console.log("임시저장 로직 실행:", formData);
	} else if (intent === "publish") {
		console.log("발행 로직 실행:", formData);
		if (toolId) {
			// 수정
		} else {
			// 생성
		}
	}

	return redirect("/");
}

export default function ToolEditPage() {
	return <ToolEditForm />;
}
