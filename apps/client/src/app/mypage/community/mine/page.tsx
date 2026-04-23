import type { PostType } from "@/common/components/post-item/post-item";
import PostItem from "@/common/components/post-item/post-item";
import * as styles from "../community.css";

const MY_POSTS: PostType[] = Array.from({ length: 2 }).map((_, i) => ({
	id: i,
	tool: "Figma",
	author: "또이",
	date: "2025.01.05",
	title: "내가 쓴 피그마 꿀팁 대방출",
	content:
		"이 글은 내가 직접 쓴 글이에요. 피그마 단축키와 오토레이아웃 활용법을 정리해 보았습니다...",
	comments: 5,
	bookmarks: 12,
}));

export default function MyPostsPage() {
	return (
		<div className={styles.postList}>
			{MY_POSTS.map((post) => (
				<PostItem key={post.id} post={post} />
			))}
		</div>
	);
}
