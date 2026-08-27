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
						{/*
						 * 필터가 바뀌면 key가 바뀌어 인스턴스가 새로 만들어지고 누적분이 버려진다.
						 * 반대로 찜하기 등의 재검증(updateTag)으로 이 페이지만 다시 렌더될 때는
						 * key가 같아 스크롤로 쌓아둔 목록이 유지된다.
						 */}
						<ToolListGrid
							key={`${currentCategory}-${currentCriteria}-${isFree}`}
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
