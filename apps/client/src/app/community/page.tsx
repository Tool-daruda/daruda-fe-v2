import { CommunityFilterSidebar } from "./_components/community-filter-sidebar";
import { CommunityHero } from "./_components/community-hero";
import { CommunityHotSection } from "./_components/community-hot-section";
import { CommunityPostList } from "./_components/community-post-list";
import { CommunityWriteButton } from "./_components/community-write-button";
import {
	MOCK_FILTER_CATEGORIES,
	MOCK_HOT_HASHTAGS,
	MOCK_HOT_POSTS,
	MOCK_POSTS,
} from "./_mocks/community-mock";
import * as s from "./community.css";

interface Props {
	searchParams: Promise<{
		keyword?: string;
	}>;
}

// TODO(api): BoardApi.getBoardList / ToolApi.getCategories 연동 시 목데이터를 실제 데이터로 교체합니다.
export default async function CommunityPage({ searchParams }: Props) {
	const resolvedSearchParams = await searchParams;

	return (
		<>
			<CommunityHero defaultKeyword={resolvedSearchParams.keyword} />

			<div className={s.container}>
				<div className={s.mainLayout}>
					<CommunityFilterSidebar categories={MOCK_FILTER_CATEGORIES} />

					<section className={s.content}>
						<CommunityHotSection hashtags={MOCK_HOT_HASHTAGS} posts={MOCK_HOT_POSTS} />
						<CommunityPostList posts={MOCK_POSTS} />
					</section>
				</div>
			</div>

			<CommunityWriteButton />
		</>
	);
}
