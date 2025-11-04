import { Pagination, ToolCard } from "@repo/ui";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getKoreanCategoryName } from "@/entities/tool";
import { useAdminToolsQuery } from "@/entities/tool/api/queries";
import * as S from "./index.css";

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
	} = useAdminToolsQuery({
		page: currentPage - 1,
		size: ITEMS_PER_PAGE,
	});

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
			<div className={S.listHeader}>
				<h1 className={S.title}>
					툴 개수 <span className={S.toolCount}>{toolData?.totalElements}</span>개
				</h1>
				<div className={S.tableHeader}>
					<span className={S.tableTitle}>No.</span>
					<span className={S.tableTitle}>로고</span>
					<span className={S.tableTitle}>툴 이름</span>
					<span className={S.tableTitle}>한줄 소개</span>
					<span className={S.tableTitle}>카테고리</span>
					<span className={S.tableTitle}>추가된 날짜</span>
					<span className={S.tableTitle}>설정</span>
				</div>
			</div>

			<div>
				{tools.length > 0 ? (
					tools.map((tool) => (
						<ToolCard
							key={tool.toolId}
							toolId={tool.toolId}
							toolLogo={tool.toolLogo}
							toolName={tool.toolName}
							description={tool.description}
							category={getKoreanCategoryName(tool.category)}
							updatedAt={tool.createdAt}
							onClick={() => handleEditClick(tool.toolId)}
						/>
					))
				) : (
					<p>등록된 툴이 없습니다.</p>
				)}
			</div>

			{totalPages > 1 && (
				<div className={S.paginationStyle}>
					<Pagination page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
				</div>
			)}
		</div>
	);
};

export default ToolListPage;
