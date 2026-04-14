import Image from "next/image";
import type { RelatedPost } from "../_types";
import * as styles from "./styles/tool-related-post-section.css";

type Props = {
	posts: RelatedPost[];
};

export const ToolRelatedPostSection = ({ posts }: Props) => {
	return (
		<section className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>툴과 관련된 글만 모아봤어요</h2>
				<button type="button" className={styles.moreButton}>
					더보기
				</button>
			</div>

			<div className={styles.list}>
				{posts.map((post) => (
					<article key={post.id} className={styles.card}>
						<div className={styles.meta}>
							<span>{post.category}</span>
							<span>{post.author}</span>
							<span>{post.date}</span>
						</div>

						<div className={styles.body}>
							<div className={styles.textBlock}>
								<h3 className={styles.cardTitle}>{post.title}</h3>
								<p className={styles.summary}>{post.summary}</p>

								<div className={styles.reactionRow}>
									<span>♡ {post.likeCount}</span>
									<span>댓글 {post.commentCount}</span>
								</div>
							</div>

							<div className={styles.thumbnail}>
								<Image
									src={post.thumbnailUrl}
									alt={post.title}
									fill
									className={styles.thumbnailImage}
								/>
							</div>
						</div>
					</article>
				))}
			</div>
		</section>
	);
};
