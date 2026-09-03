import { Suspense } from "react";
import { getScrappedToolIds } from "@/common/api/scrap-tools";
import { ScrappedToolsProvider } from "@/common/context/scrap-context";
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

// loading.tsx를 두면 중첩 세그먼트인 /toollist/[slug]까지 덮여서
// 없는 툴이 404 대신 200으로 나갑니다. 그래서 페이지 안에서 끊습니다.
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
				<ScrappedToolsProvider idsPromise={getScrappedToolIds()}>
					<Suspense fallback={<ToolListContentSkeleton />}>
						<ToolListContent
							currentCategory={currentCategory}
							currentCriteria={currentCriteria}
							isFree={isFree}
						/>
					</Suspense>
				</ScrappedToolsProvider>
			</div>
		</>
	);
}
