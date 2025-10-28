import { createBrowserRouter } from "react-router-dom";
import { action as toolEditAction, loader as toolEditLoader } from "@/pages/tool-edit";
// import { loader as toolListLoader } from "@/pages/tool-list";
import { AdminLayout } from "@/widgets/layout";
import { ToolEditPage, ToolListPage } from "./lazy";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AdminLayout />,
		errorElement: <>앗! 에러가 발생했습니다.</>,
		children: [
			{
				index: true,
				path: "tool",
				element: <ToolListPage />,
				// loader: toolListLoader,
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
