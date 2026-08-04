import Image from "next/image";
import type { ToolDetailRes } from "@/common/api/models/tool.model";
import { ToolApi } from "@/common/api/tool-api";
import { ShareButton } from "./share-button";
import * as styles from "./styles/tool-meta-bar.css";

type Props = {
	toolId: number;
};

const getSupportedPlatforms = (platforms: ToolDetailRes["platform"]): string[] => {
	const platformObj = platforms?.[0];
	if (!platformObj) return [];

	return Object.entries(platformObj)
		.filter(([, isSupported]) => isSupported)
		.map(([platformName]) => platformName);
};

export const ToolMetaBar = async ({ toolId }: Props) => {
	const info = await ToolApi.getToolDetail(toolId);

	if (!info) return null;

	const keywords = info.keywords ? info.keywords.slice(0, 2) : [];
	const platforms = getSupportedPlatforms(info.platform);

	const supportKoreaText = info.supportKorea ? "O" : "X";
	const siteUrl = info.toolLink || "#";

	return (
		<section className={styles.container}>
			<div className={styles.metaItems}>
				<div className={styles.item}>
					<span className={styles.label}>키워드</span>
					<div className={styles.valueGroup}>
						{keywords.map((word, idx) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: 키워드는 변경되지 않는 고유한 값이므로 인덱스 사용이 안전함
							<span key={idx} className={styles.badge.gray}>
								{word}
							</span>
						))}
						{keywords.length === 0 && <span className={styles.value}>기타</span>}
					</div>
				</div>

				<div className={styles.item}>
					<span className={styles.label}>플랜</span>
					<span className={styles.badge.value}>{info.license}</span>
				</div>

				<div className={styles.item}>
					<span className={styles.label}>한국어 지원</span>
					<span className={styles.badge.gray}>{supportKoreaText}</span>
				</div>

				<div className={styles.item}>
					<span className={styles.label}>플랫폼</span>
					<div className={styles.valueGroup}>
						{platforms.map((platform) => (
							<span key={platform} className={styles.badge.gray}>
								{platform}
							</span>
						))}
						{platforms.length === 0 && <span className={styles.value}>정보 없음</span>}
					</div>
				</div>
			</div>

			<div className={styles.actionGroup}>
				<a
					href={siteUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.primaryButton}
				>
					<Image src="/icons/ic_link_20.svg" alt="링크 아이콘" width={20} height={20} />
					직접 체험해보기
				</a>
				<button type="button" className={styles.iconButton} aria-label="북마크">
					<Image src="/icons/ic_bookmark_outline_24.svg" alt="북마크" width={24} height={24} />
				</button>
				<ShareButton />
			</div>
		</section>
	);
};
