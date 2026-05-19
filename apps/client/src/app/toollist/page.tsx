import { ToolApi } from "@/common/api/tool-api";
import { FilterBar } from "./_components/filter-bar";
import { SearchBar } from "./_components/search-bar";
import { SidebarWrapper } from "./_components/sidebar-wrapper";
import * as s from "./_components/toollist.css";

interface Props {
	searchParams: Promise<{
		category?: string;
		criteria?: string;
		isFree?: string;
	}>;
}

export default async function ToolListPage({ searchParams }: Props) {
	const resolvedSearchParams = await searchParams;
	const currentCategory = resolvedSearchParams.category || "ALL";
	const currentCriteria = resolvedSearchParams.criteria || "popular";
	const isFree = resolvedSearchParams.isFree === "true";

	const [categoriesRes, initialToolsRes] = await Promise.all([
		ToolApi.getCategories(),
		ToolApi.getToolList({
			category: currentCategory,
			criteria: currentCriteria,
			isFree: isFree,
		}),
	]);

	const categories = categoriesRes || [];
	const toolList = initialToolsRes?.tools || [];

	return (
		<>
			<SearchBar />
			<div className={s.container}>
				<FilterBar />
				<div className={s.mainLayout}>
					<SidebarWrapper categories={categories} currentCategory={currentCategory} />

					<section className={s.content}>
						<div className={s.grid}>
							{toolList.length === 0 ? (
								<p>해당 카테고리의 툴이 없습니다.</p>
							) : (
								toolList.map((tool) => (
									<div
										key={tool.toolId}
										style={{
											border: "1px solid #eee",
											padding: "20px",
											borderRadius: "12px",
											backgroundColor: "#fff",
										}}
									>
										<h3>{tool.toolName}</h3>
										<p>{tool.description}</p>
									</div>
								))
							)}
						</div>
					</section>
				</div>
			</div>
		</>
	);
}
