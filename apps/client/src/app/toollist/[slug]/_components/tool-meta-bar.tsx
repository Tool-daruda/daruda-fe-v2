import type { ToolDetailRes } from "@/common/api/models/tool.model";
import { ToolApi } from "@/common/api/tool-api";
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

	const mainCategory = info.category || "기타";
	const subCategory = info.keywords?.[0] ?? "";
	const keywordText = subCategory ? `${mainCategory} · ${subCategory}` : mainCategory;

	const supportKoreaText = info.supportKorea ? "지원" : "미지원";
	const platformText = getSupportedPlatforms(info.platform).join(" ");
	const siteUrl = info.toolLink || "#";

	return (
		<section className={styles.container}>
			<div className={styles.metaItems}>
				<div className={styles.item}>
					<span className={styles.label}>키워드</span>
					<span className={styles.value}>{keywordText}</span>
				</div>

				<div className={styles.item}>
					<span className={styles.label}>플랜</span>
					<span className={styles.valueBadge}>{info.license}</span>
				</div>

				<div className={styles.item}>
					<span className={styles.label}>한국어 지원</span>
					<span className={styles.value}>{supportKoreaText}</span>
				</div>

				<div className={styles.item}>
					<span className={styles.label}>플랫폼</span>
					<span className={styles.value}>{platformText || "정보 없음"}</span>
				</div>
			</div>

			<div className={styles.actionGroup}>
				<a
					href={siteUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.primaryButton}
				>
					↗ 직접 체험해보기
				</a>
				<button type="button" className={styles.iconButton} aria-label="북마크">
					🔖
				</button>
				<button type="button" className={styles.iconButton} aria-label="공유">
					↗
				</button>
			</div>
		</section>
	);
};
