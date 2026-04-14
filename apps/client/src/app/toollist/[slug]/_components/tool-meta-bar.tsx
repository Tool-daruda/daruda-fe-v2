import type { ToolDetail } from "../_types";
import * as styles from "./styles/tool-meta-bar.css";

type Props = {
	toolDetail: ToolDetail;
};

export const ToolMetaBar = ({ toolDetail }: Props) => {
	return (
		<section className={styles.container}>
			<div className={styles.metaItems}>
				<div className={styles.item}>
					<span className={styles.label}>키워드</span>
					<span className={styles.value}>
						{toolDetail.category.main} · {toolDetail.category.sub}
					</span>
				</div>

				<div className={styles.item}>
					<span className={styles.label}>플랜</span>
					<span className={styles.valueBadge}>{toolDetail.priceLabel}</span>
				</div>

				<div className={styles.item}>
					<span className={styles.label}>한국어 지원</span>
					<span className={styles.value}>{toolDetail.support}</span>
				</div>

				<div className={styles.item}>
					<span className={styles.label}>플랫폼</span>
					<span className={styles.value}>{toolDetail.platforms.join(" ")}</span>
				</div>
			</div>
			<div className={styles.actionGroup}>
				<a
					href={toolDetail.siteUrl}
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
