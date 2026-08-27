import Image from "next/image";
import { ToolApi } from "@/common/api/tool-api";
import { TOOL_SECTION_IDS } from "../_constants/toc";
import { toExternalUrl } from "../_utils/external-url";
import * as styles from "./styles/tool-use-case-section.css";
import { ToolEmptyState } from "./tool-empty-state";

type Props = {
	toolId: number;
};

export const ToolUseCaseSection = async ({ toolId }: Props) => {
	const [info, blogsData] = await Promise.all([
		ToolApi.getToolDetail(toolId),
		ToolApi.getToolBlogs(toolId).catch(() => null),
	]);

	const blogs = blogsData?.toolBlogs ?? [];

	return (
		<section id={TOOL_SECTION_IDS.useCase} className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>이렇게 활용해 보세요</h2>
			</div>

			{blogs.length === 0 ? (
				<ToolEmptyState message="등록된 컨텐츠가 없어요" />
			) : (
				<div className={styles.grid}>
					{blogs.map((blog) => {
						return (
							<a
								key={blog.blogId}
								href={toExternalUrl(blog.blogUrl)}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.card}
							>
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
									<h3 className={styles.cardTitle}>{info.toolMainName} 활용 가이드</h3>
									{/* 링크 주소를 요약 정보처럼 깔끔하게 노출 */}
									<p className={styles.summary}>{blog.blogUrl}</p>
									<p className={styles.author}>공식 블로그</p>
								</div>
							</a>
						);
					})}
				</div>
			)}
		</section>
	);
};
