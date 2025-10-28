import { Pagination, ToolCard } from "@repo/ui";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAdminTools } from "@/entities/tool/api/queries";

const ITEMS_PER_PAGE = 10;

const ToolListPage = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const currentPage = Number(searchParams.get("page") || 1);

	const {
		data: toolData,
		isLoading,
		isError,
		error,
	} = useAdminTools({
		page: currentPage - 1,
		size: ITEMS_PER_PAGE,
	});
	console.log(toolData);
	const handlePageChange = (page: number) => {
		setSearchParams({ page: String(page) });
		window.scrollTo(0, 0);
	};

	const handleEditClick = (toolId: number) => {
		navigate(`${toolId}`);
	};

	if (isLoading) {
		return <div>Loading tools...</div>;
	}

	if (isError) {
		return <div>Error loading tools: {error?.message || "Unknown error"}</div>;
	}

	const tools = toolData?.tools || [];
	const totalPages = toolData?.totalPages || 1;

	return (
		<div>
			<h1>툴 목록</h1>

			<div>
				{tools.length > 0 ? (
					tools.map((tool) => (
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
					))
				) : (
					<p>등록된 툴이 없습니다.</p>
				)}
			</div>

			{totalPages > 1 && (
				<div>
					<Pagination page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
				</div>
			)}
		</div>
	);
};

export default ToolListPage;
