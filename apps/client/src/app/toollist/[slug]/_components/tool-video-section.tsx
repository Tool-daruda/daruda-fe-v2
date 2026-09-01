import Image from "next/image";
import { ToolApi } from "@/common/api/tool-api";
import { TOOL_SECTION_IDS } from "../_constants/toc";
import * as styles from "./styles/tool-video-section.css";
import { ToolEmptyState } from "./tool-empty-state";

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

// 유튜브가 아닌 주소는 썸네일을 유추할 수 없다. 원본 URL을 그대로 next/image에 넘기면
// remotePatterns에 없는 도메인이라 렌더가 통째로 터지므로 null로 두고 대체 화면을 그린다.
const getVideoThumbnailUrl = (url: string) => {
	const videoId = getYoutubeVideoId(url);
	return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
};

export const ToolVideoSection = async ({ toolId }: Props) => {
	const info = await ToolApi.getToolDetail(toolId);

	if (!info) return null;

	const videos = info.videos ?? [];

	return (
		<section id={TOOL_SECTION_IDS.video} className={styles.container}>
			<h2 className={styles.title}>이 영상을 참고해보세요</h2>

			{videos.length === 0 ? (
				<ToolEmptyState message="등록된 컨텐츠가 없어요" />
			) : (
				<div className={styles.grid}>
					{videos.map((videoUrl, index) => {
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
								{thumbnailUrl ? (
									<>
										<Image
											src={thumbnailUrl}
											alt={`${info.toolMainName} 추천 영상 ${index + 1}`}
											fill
											sizes="(max-width: 768px) 100vw, 33vw"
											className={styles.image}
											style={{ objectFit: "cover" }}
										/>
										<div className={styles.dim} />
										<Image
											src="/icons/ic_video_play_48.svg"
											alt=""
											width={48}
											height={48}
											className={styles.playIcon}
										/>
									</>
								) : (
									<Image
										src="/icons/ic_video_play_48.svg"
										alt=""
										width={48}
										height={48}
										className={styles.fallbackPlayIcon}
									/>
								)}
							</a>
						);
					})}
				</div>
			)}
		</section>
	);
};
