import PostItem from "@/common/components/post-item/post-item";
import * as styles from "../community.css";

const DUMMY_POSTS = Array.from({ length: 4 }).map((_, i) => ({
	id: i,
	tool: "Adobe Illustrator",
	author: "닉네임",
	date: "2025.01.01",
	title: "대학생들이 가장 많이 저장한 글이에요.",
	content:
		"대학생들이 가장 많이 저장한 글이에요대학생들이 가장 많이 저장한 글이에요대학생들이 가장 많이 저장한 글이에요대학생들이 가장 많이 저장한 글이에요대학생들이 가장 많이 저장한 글이에요...",
	comments: 1,
	bookmarks: 30,
}));

export default function SavedPostsPage() {
	return (
		<div className={styles.postList}>
			{DUMMY_POSTS.map((post) => (
				<PostItem key={post.id} post={post} />
			))}
		</div>
	);
}
