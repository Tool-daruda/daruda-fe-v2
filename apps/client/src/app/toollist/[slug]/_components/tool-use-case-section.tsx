import { ToolApi } from "@/common/api/tool-api";
import { TOOL_SECTION_IDS } from "../_constants/toc";
import { toExternalUrl } from "../_utils/external-url";
import * as styles from "./styles/tool-use-case-section.css";
import { ToolEmptyState } from "./tool-empty-state";

type Props = {
	toolId: number;
};

export const ToolUseCaseSection = async ({ toolId }: Props) => {
	const blogsData = await ToolApi.getToolBlogs(toolId).catch(() => null);

	const blogs = blogsData?.toolBlogs ?? [];

	return (
		<section id={TOOL_SECTION_IDS.useCase} className={styles.container}>
			<h2 className={styles.title}>이렇게 활용해 보세요</h2>

			{blogs.length === 0 ? (
				<ToolEmptyState message="등록된 컨텐츠가 없어요" />
			) : (
				<div className={styles.grid}>
					{blogs.map((blog) => (
						<a
							key={blog.blogId}
							href={toExternalUrl(blog.blogUrl)}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.card}
						>
							<div className={styles.thumbnail}>
								{blog.thumbnailUrl && (
									// biome-ignore lint/performance/noImgElement: 원문 블로그에서 긁어온 주소라 호스트를 미리 알 수 없다. next/image는 remotePatterns에 없는 도메인에서 렌더가 통째로 터진다.
									<img
										src={blog.thumbnailUrl}
										alt=""
										loading="lazy"
										className={styles.thumbnailImage}
									/>
								)}
							</div>

							<div className={styles.content}>
								<div className={styles.textBlock}>
									<p className={styles.cardTitle}>{blog.title || blog.blogUrl}</p>
									<p className={styles.summary}>{blog.summary}</p>
								</div>

								<div className={styles.siteRow}>
									{blog.faviconUrl && (
										// biome-ignore lint/performance/noImgElement: 위 썸네일과 같은 이유
										<img
											src={blog.faviconUrl}
											alt=""
											width={14}
											height={14}
											loading="lazy"
											className={styles.favicon}
										/>
									)}
									<span className={styles.siteName}>{blog.siteName}</span>
								</div>
							</div>
						</a>
					))}
				</div>
			)}
		</section>
	);
};
