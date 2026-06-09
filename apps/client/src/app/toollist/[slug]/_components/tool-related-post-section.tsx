import Image from "next/image";
import { BoardApi } from "@/common/api/board-api";
import * as styles from "./styles/tool-related-post-section.css";

type Props = {
	toolId: number;
};

export const ToolRelatedPostSection = async ({ toolId }: Props) => {
	const boardData = await BoardApi.getBoardList({
		toolId,
		noTopic: false,
		size: 3,
	}).catch(() => null);

	return (
		<section className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>툴과 관련된 글만 모아봤어요</h2>
				<button type="button" className={styles.moreButton}>
					더보기
				</button>
			</div>

			<div className={styles.list}>
				{boardData?.contents.map((post) => (
					<article key={post.boardId} className={styles.card}>
						<div className={styles.meta}>
							<span>{post.toolName}</span>
							<span>{post.author}</span>
							<span>{post.updatedAt}</span>
						</div>

						<div className={styles.body}>
							<div className={styles.textBlock}>
								<h3 className={styles.cardTitle}>{post.title}</h3>
								<p className={styles.summary}>{post.content}</p>

								<div className={styles.reactionRow}>
									<span>♡ {post.author}</span>
									<span>댓글 {post.commentCount}</span>
								</div>
							</div>

							<div className={styles.thumbnail}>
								<Image
									src={post.images[0] ? post.images[0] : "/placeholder-thumbnail.png"}
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
