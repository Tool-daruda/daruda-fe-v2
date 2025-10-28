import { createBrowserRouter } from "react-router-dom";
import { action as toolEditAction, loader as toolEditLoader } from "@/pages/tool-edit";
import { AdminLayout } from "@/widgets/layout";
import { ToolEditPage, ToolListPage } from "./lazy";

const router = createBrowserRouter([
	{
		path: "/daruda-admin/",
		element: <AdminLayout />,
		errorElement: <>앗! 에러가 발생했습니다.</>,
		children: [
			{
				index: true,
				path: "tool",
				element: <ToolListPage />,
			},
			{
				path: "tool/new",
				element: <ToolEditPage />,
				action: toolEditAction,
			},
			{
				path: "tool/:toolId",
				element: <ToolEditPage />,
				loader: toolEditLoader,
				action: toolEditAction,
			},
		],
	},
]);

export default router;
