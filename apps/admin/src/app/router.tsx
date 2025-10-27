import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "@/layouts/admin-layout";
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
				path: "tool/:toolId",
				element: <ToolEditPage />,
			},
		],
	},
]);

export default router;
