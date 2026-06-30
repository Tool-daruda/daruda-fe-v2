import { BoardApi } from "@/common/api/board-api";
import type { BoardSortBy } from "@/common/api/models/board.model";
import { ToolApi } from "@/common/api/tool-api";
import { CommunityFilterSidebar } from "./_components/community-filter-sidebar";
import { CommunityHero } from "./_components/community-hero";
import { CommunityHotSection } from "./_components/community-hot-section";
import { CommunityPostList } from "./_components/community-post-list";
import { CommunityWriteButton } from "./_components/community-write-button";
import type { CommunityFilterCategory } from "./_types";
import * as s from "./community.css";

interface Props {
	searchParams: Promise<{
		keyword?: string;
		toolId?: string;
		noTopic?: string;
		sortBy?: string;
	}>;
}

const POST_LIST_SIZE = 10;
const HOT_POST_SIZE = 3;
const TOOLS_PER_CATEGORY_SIZE = 50;

export default async function CommunityPage({ searchParams }: Props) {
	const resolvedSearchParams = await searchParams;
	const toolId = resolvedSearchParams.toolId ? Number(resolvedSearchParams.toolId) : undefined;
	const noTopic = resolvedSearchParams.noTopic === "true" ? true : undefined;
	const sortBy: BoardSortBy = resolvedSearchParams.sortBy === "SCRAP" ? "SCRAP" : "LATEST";

	const [categoriesRes, hotPostsRes, postsRes] = await Promise.all([
		ToolApi.getCategories().catch(() => []),
		// 지금 가장 핫한 게시글: 메인 페이지 인기 게시글과 동일하게 스크랩순 정렬을 재사용합니다.
		BoardApi.getBoardList({ sortBy: "SCRAP", size: HOT_POST_SIZE }).catch(() => null),
		BoardApi.getBoardList({ toolId, noTopic, sortBy, size: POST_LIST_SIZE }).catch(() => null),
	]);

	const categories = (categoriesRes || []).filter((category) => category.name !== "ALL");

	// 필터링 옵션의 카테고리별 툴 목록을 카테고리마다 병렬로 조회합니다.
	const filterCategories: CommunityFilterCategory[] = await Promise.all(
		categories.map(async (category) => {
			const toolsRes = await ToolApi.getToolList({
				category: category.name,
				isFree: false,
				size: TOOLS_PER_CATEGORY_SIZE,
			}).catch(() => null);

			return {
				name: category.name,
				koreanName: category.koreanName,
				tools: (toolsRes?.tools || []).map((tool) => ({
					toolId: tool.toolId,
					toolName: tool.toolName,
					toolLogo: tool.toolLogo,
				})),
			};
		})
	);

	const hotPosts = hotPostsRes?.contents || [];
	const posts = postsRes?.contents || [];

	return (
		<>
			<CommunityHero defaultKeyword={resolvedSearchParams.keyword} />

			<div className={s.container}>
				<div className={s.mainLayout}>
					<CommunityFilterSidebar
						categories={filterCategories}
						selectedToolId={toolId}
						isFreeOnly={!!noTopic}
					/>

					<section className={s.content}>
						<CommunityHotSection posts={hotPosts} />
						<CommunityPostList posts={posts} sortBy={sortBy} />
					</section>
				</div>
			</div>

			<CommunityWriteButton />
		</>
	);
}
