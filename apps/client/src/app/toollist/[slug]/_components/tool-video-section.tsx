import Image from "next/image";
import { ToolApi } from "@/common/api/tool-api";
import * as styles from "./styles/tool-video-section.css";

type Props = {
	toolId: number;
};

const getYoutubeVideoId = (url: string) => {
	try {
		const parsedUrl = new URL(url);

		if (parsedUrl.hostname === "youtu.be") {
			return parsedUrl.pathname.replace("/", "");
		}
		if (parsedUrl.hostname.includes("youtube.com")) {
			return parsedUrl.searchParams.get("v");
		}
		return null;
	} catch {
		return null;
	}
};

const getVideoThumbnailUrl = (url: string) => {
	const videoId = getYoutubeVideoId(url);
	return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : url;
};

export const ToolVideoSection = async ({ toolId }: Props) => {
	const info = await ToolApi.getToolDetail(toolId);

	if (!info || !info.videos || info.videos.length === 0) return null;

	return (
		<section className={styles.container}>
			<h2 className={styles.title}>이 영상을 참고해보세요</h2>

			<div className={styles.grid}>
				{info.videos.map((videoUrl, index) => {
					const thumbnailUrl = getVideoThumbnailUrl(videoUrl);

					return (
						<a
							// biome-ignore lint/suspicious/noArrayIndexKey: 영상 URL이 고유하므로 인덱스 키 사용해도 무방
							key={index}
							href={videoUrl}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.card}
						>
							<Image
								src={thumbnailUrl}
								alt={`${info.toolMainName} 추천 영상 ${index + 1}`}
								fill
								sizes="(max-width: 768px) 100vw, 33vw"
								className={styles.image}
								style={{ objectFit: "cover" }}
							/>
						</a>
					);
				})}
			</div>
		</section>
	);
};
