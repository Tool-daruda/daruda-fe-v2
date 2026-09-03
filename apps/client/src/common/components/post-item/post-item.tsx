import Image from "next/image";
import Link from "next/link";
import * as styles from "./post-item.css";

export interface PostType {
	id: number;
	tool: string;
	author: string;
	date: string;
	title: string;
	content: string;
	comments: number;
	bookmarks: number;
	thumbnailUrl?: string;
}

export default function PostItem({ post }: { post: PostType }) {
	return (
		<Link href={`/community/${post.id}`}>
			<article className={styles.postCard}>
				<div className={styles.postContent}>
					<div className={styles.postHeader}>
						<div className={styles.toolBadge}>
							<div className={styles.toolIconPlaceholder} />
							{post.tool}
						</div>
						<span>{post.author}</span>
						<span>|</span>
						<span>{post.date}</span>
					</div>

					<h2 className={styles.postTitle}>{post.title}</h2>
					<p className={styles.postBody}>{post.content}</p>

					<div className={styles.postFooter}>
						<span className={styles.iconText}>
							<Image src="/svg/post/ic_comment_16.svg" alt="댓글" width={16} height={16} />{" "}
							{post.comments}개
						</span>
						<span className={styles.iconText}>
							<Image src="/svg/post/ic_bookmark_16.svg" alt="북마크" width={16} height={16} />{" "}
							{post.bookmarks}회
						</span>
					</div>
				</div>

				{post.thumbnailUrl && (
					<div className={styles.thumbnail}>
						<Image
							src={post.thumbnailUrl}
							alt={post.title}
							fill
							sizes="120px"
							style={{ objectFit: "cover" }}
						/>
					</div>
				)}
			</article>
		</Link>
	);
}
