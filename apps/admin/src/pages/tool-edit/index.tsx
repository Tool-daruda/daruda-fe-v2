import { type ActionFunctionArgs, type LoaderFunctionArgs, redirect } from "react-router-dom";
import { ToolEditForm } from "@/features/tool-edit-form/tool-edit-form";

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
	const _formData = await request.formData();
	// const data = Object.fromEntries(formData);

	if (toolId) {
		// await updateTool(toolId, data);
	} else {
		// await createTool(data);
	}

	return redirect("/daruda-admin/tool");
}

export default function ToolEditPage() {
	return <ToolEditForm />;
}
