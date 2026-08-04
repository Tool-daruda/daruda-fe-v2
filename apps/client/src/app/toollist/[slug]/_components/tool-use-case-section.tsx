import Image from "next/image";
import { ToolApi } from "@/common/api/tool-api";
import * as styles from "./styles/tool-use-case-section.css";

type Props = {
	toolId: number;
};

export const ToolUseCaseSection = async ({ toolId }: Props) => {
	const [info, blogsData] = await Promise.all([
		ToolApi.getToolDetail(toolId),
		ToolApi.getToolBlogs(toolId).catch(() => null),
	]);

	const blogs = blogsData?.toolBlogs ?? [];

	if (blogs.length === 0) return null;

	return (
		<section className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>이렇게 활용해 보세요</h2>
			</div>

			<div className={styles.grid}>
				{blogs.map((blog) => {
					return (
						<article key={blog.blogId} className={styles.card}>
							<div className={styles.thumbnail}>
								<Image
									src={info.toolLogo}
									alt={`${info.toolMainName} 활용법`}
									fill
									sizes="(max-width: 768px) 100vw, 33vw"
									className={styles.thumbnailImage}
									style={{ objectFit: "contain", padding: "12px" }}
								/>
							</div>

							<div className={styles.content}>
								<h3 className={styles.cardTitle}>
									<a
										href={blog.blogUrl}
										target="_blank"
										rel="noopener noreferrer"
										style={{ textDecoration: "none", color: "inherit" }}
									>
										{info.toolMainName} 활용 가이드
									</a>
								</h3>
								{/* 링크 주소를 요약 정보처럼 깔끔하게 노출 */}
								<p className={styles.summary}>{blog.blogUrl}</p>
								<p className={styles.author}>공식 블로그</p>
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
};
