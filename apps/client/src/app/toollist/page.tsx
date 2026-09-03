import { Suspense } from "react";
import { FilterBar } from "./_components/filter-bar";
import { SearchBar } from "./_components/search-bar";
import { ToolListContent, ToolListContentSkeleton } from "./_components/tool-list-content";
import * as s from "./_components/toollist.css";

interface Props {
	searchParams: Promise<{
		category?: string;
		criteria?: string;
		isFree?: string;
	}>;
}

// 데이터가 필요한 건 사이드바와 목록뿐이라 그 아래만 Suspense로 끊습니다.
// loading.tsx를 쓰면 중첩 세그먼트인 /toollist/[slug]까지 덮여
// 없는 툴이 404 대신 200으로 나갑니다.
export default async function ToolListPage({ searchParams }: Props) {
	const resolvedSearchParams = await searchParams;
	const currentCategory = resolvedSearchParams.category || "ALL";
	const currentCriteria = resolvedSearchParams.criteria || "popular";
	const isFree = resolvedSearchParams.isFree === "true";

	return (
		<>
			<SearchBar />
			<div className={s.container}>
				<FilterBar />
				<Suspense fallback={<ToolListContentSkeleton />}>
					<ToolListContent
						currentCategory={currentCategory}
						currentCriteria={currentCriteria}
						isFree={isFree}
					/>
				</Suspense>
			</div>
		</>
	);
}
