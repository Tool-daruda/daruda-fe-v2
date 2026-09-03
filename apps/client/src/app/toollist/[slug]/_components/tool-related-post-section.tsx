import Image from "next/image";
import Link from "next/link";
import { BoardApi } from "@/common/api/board-api";
import { formatDate } from "@/common/utils";
import { TOOL_SECTION_IDS } from "../_constants/toc";
import * as styles from "./styles/tool-related-post-section.css";
import { ToolEmptyState } from "./tool-empty-state";

type Props = {
	toolId: number;
};

export const ToolRelatedPostSection = async ({ toolId }: Props) => {
	const boardData = await BoardApi.getBoardList({
		toolId,
		noTopic: false,
		size: 3,
	}).catch(() => null);

	const posts = boardData?.contents ?? [];

	return (
		<section id={TOOL_SECTION_IDS.community} className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>툴과 관련된 글만 모아봤어요</h2>
				<Link href={`/community?toolId=${toolId}`} className={styles.moreButton}>
					더보기
				</Link>
			</div>

			{posts.length === 0 ? (
				<ToolEmptyState message="등록된 컨텐츠가 없어요" />
			) : (
				<div className={styles.list}>
					{posts.map((post) => (
						<Link key={post.boardId} href={`/community/${post.boardId}`} className={styles.card}>
							<div className={styles.cardHead}>
								{post.toolName && (
									<div className={styles.toolChip}>
										<div className={styles.toolLogo}>
											{post.toolLogo && (
												<Image src={post.toolLogo} alt="" fill style={{ objectFit: "cover" }} />
											)}
										</div>
										<span className={styles.toolName}>{post.toolName}</span>
									</div>
								)}
								<div className={styles.metaRow}>
									<span>{post.author}</span>
									<div className={styles.metaDivider} />
									<span>{formatDate(post.updatedAt)}</span>
								</div>
							</div>

							<div className={styles.cardBody}>
								<div className={styles.cardBodyLeft}>
									<div className={styles.textBlock}>
										<p className={styles.cardTitle}>{post.title}</p>
										<p className={styles.cardContent}>{post.content}</p>
									</div>

									<div className={styles.statsRow}>
										<span className={styles.statItem}>
											<Image src="/svg/post/ic_comment_16.svg" alt="" width={16} height={16} />
											{post.commentCount}개
										</span>
										<div className={styles.metaDivider} />
										<span className={styles.statItem}>
											<Image src="/svg/post/ic_bookmark_16.svg" alt="" width={16} height={16} />
											{post.scrapCount}회
										</span>
									</div>
								</div>

								{post.images[0] && (
									<div className={styles.thumbnail}>
										<Image
											src={post.images[0]}
											alt={post.title}
											fill
											style={{ objectFit: "cover" }}
										/>
									</div>
								)}
							</div>
						</Link>
					))}
				</div>
			)}
		</section>
	);
};
