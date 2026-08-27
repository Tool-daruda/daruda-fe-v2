import { BoardApi } from "@/common/api/board-api";
import { UserApi } from "@/common/api/user-api";
import { UserProvider } from "@/common/context/user-context";
import { MainCommunityCard } from "./main-community-card";
import * as s from "./popular-posts-section.css";
import { SectionHeader } from "./section-header";

export const PopularPostsSection = async () => {
	// 카드 더보기 메뉴의 소유자 판정(useContentMenu)에 닉네임이 필요합니다.
	// 메인은 community 레이아웃 밖이라 이 섹션에서 직접 UserProvider를 붙입니다.
	const [boardListRes, user] = await Promise.all([
		BoardApi.getBoardList({
			noTopic: true,
			size: 6,
			sortBy: "SCRAP",
		}).catch(() => null),
		UserApi.getCurrentUser(),
	]);

	const posts = boardListRes?.contents || [];

	if (posts.length === 0) return null;

	return (
		<section>
			<SectionHeader
				iconSrc="/icons/main/ic_main__community_24.svg"
				title="대학생들이 가장 많이 저장한 글이에요"
				moreHref="/community"
			/>

			<UserProvider user={user}>
				<div className={s.grid}>
					{posts.map((post) => (
						<MainCommunityCard key={post.boardId} post={post} />
					))}
				</div>
			</UserProvider>
		</section>
	);
};
