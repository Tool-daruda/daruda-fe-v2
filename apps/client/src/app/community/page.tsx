import { Suspense } from "react";
import type { BoardSortBy } from "@/common/api/models/board.model";
import { CommunityFilterSidebarFeed } from "./_components/community-filter-sidebar-feed";
import { CommunityHero } from "./_components/community-hero";
import { CommunityHotFeed } from "./_components/community-hot-feed";
import { CommunityPostFeed } from "./_components/community-post-feed";
import { CommunityWriteButton } from "./_components/community-write-button";
import * as s from "./community.css";

interface Props {
	searchParams: Promise<{
		keyword?: string;
		toolId?: string;
		noTopic?: string;
		sortBy?: string;
	}>;
}

export default async function CommunityPage({ searchParams }: Props) {
	const resolvedSearchParams = await searchParams;
	const toolId = resolvedSearchParams.toolId ? Number(resolvedSearchParams.toolId) : undefined;
	const noTopic = resolvedSearchParams.noTopic === "true" ? true : undefined;
	const sortBy: BoardSortBy = resolvedSearchParams.sortBy === "SCRAP" ? "SCRAP" : "LATEST";

	return (
		<>
			<CommunityHero defaultKeyword={resolvedSearchParams.keyword} />

			<div className={s.container}>
				<div className={s.mainLayout}>
					<Suspense fallback={<div style={{ width: "192px", flexShrink: 0 }} />}>
						<CommunityFilterSidebarFeed selectedToolId={toolId} isFreeOnly={!!noTopic} />
					</Suspense>

					<section className={s.content}>
						<Suspense fallback={null}>
							<CommunityHotFeed />
						</Suspense>
						<Suspense fallback={<div style={{ height: "200px" }} />}>
							<CommunityPostFeed toolId={toolId} noTopic={noTopic} sortBy={sortBy} />
						</Suspense>
					</section>
				</div>
			</div>

			<CommunityWriteButton />
		</>
	);
}
