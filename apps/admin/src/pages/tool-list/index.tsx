import { Pagination, ToolCard } from "@repo/ui";
import type React from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import type { ToolCardType } from "@/entities/tool";

const listWrapperStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "16px",
	alignItems: "center",
	padding: "2rem",
};

const paginationWrapperStyle: React.CSSProperties = {
	display: "flex",
	justifyContent: "center",
	padding: "2rem",
};

interface ToolListLoaderData {
	tools: ToolCardType[];
	totalPages: number;
	currentPage: number;
}

// export async function loader({ request }: LoaderFunctionArgs) {
// 	const url = new URL(request.url);
// 	const page = Number(url.searchParams.get("page") || 1);

// 	const data = await getTools({ page: page - 1 });

// 	return {
// 		tools: data.content,
// 		totalPages: data.totalPages,
// 		currentPage: page,
// 	};
// }

const ToolListPage = () => {
	const navigate = useNavigate();
	const { tools, totalPages, currentPage } = useLoaderData() as ToolListLoaderData;

	const [_searchParams, setSearchParams] = useSearchParams();

	const handlePageChange = (page: number) => {
		setSearchParams({ page: String(page) });
	};

	const handleEditClick = (toolId: number) => {
		navigate(`/tool/${toolId}`);
	};

	return (
		<div>
			<h1>툴 목록</h1>

			<div style={listWrapperStyle}>
				{tools.map((tool) => (
					<ToolCard
						key={tool.toolId}
						toolId={tool.toolId}
						toolLogo={tool.toolLogo}
						toolName={tool.toolName}
						description={tool.description}
						category={tool.category}
						updatedAt={tool.createdAt}
						onClick={() => handleEditClick(tool.toolId)}
					/>
				))}
			</div>

			<div style={paginationWrapperStyle}>
				<Pagination page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
			</div>
		</div>
	);
};

export default ToolListPage;
