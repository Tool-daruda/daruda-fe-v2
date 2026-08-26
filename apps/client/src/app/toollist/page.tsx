import { ToolApi } from "@/common/api/tool-api";
import { FilterBar } from "./_components/filter-bar";
import { SearchBar } from "./_components/search-bar";
import { SidebarWrapper } from "./_components/sidebar-wrapper";
import { ToolListGrid } from "./_components/tool-list-grid";
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
		// 검색 결과가 0건이면 백엔드가 200 대신 404를 내려주므로, 빈 목록으로 취급한다.
		ToolApi.getToolList({
			category: currentCategory,
			criteria: currentCriteria,
			isFree: isFree,
		}).catch(() => null),
	]);

	const categories = categoriesRes || [];
	const toolList = initialToolsRes?.tools || [];
	const pagination = initialToolsRes?.scrollPaginationDto;

	return (
		<>
			<SearchBar />
			<div className={s.container}>
				<FilterBar />
				<div className={s.mainLayout}>
					<SidebarWrapper categories={categories} currentCategory={currentCategory} />

					<section className={s.content}>
						<ToolListGrid
							initialTools={toolList}
							initialNextCursor={pagination?.nextCursor ?? null}
							totalElements={pagination?.totalElements ?? toolList.length}
							category={currentCategory}
							criteria={currentCriteria}
							isFree={isFree}
						/>
					</section>
				</div>
			</div>
		</>
	);
}
