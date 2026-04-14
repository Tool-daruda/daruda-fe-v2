import Image from "next/image";
import type { ToolDetail } from "../_types";
import * as styles from "./styles/tool-hero.css";

type Props = {
	toolDetail: ToolDetail;
};

export const ToolHero = ({ toolDetail }: Props) => {
	return (
		<section className={styles.container}>
			<div className={styles.thumbnail}>
				<Image
					src={toolDetail.heroImageUrl}
					alt={toolDetail.name}
					fill
					className={styles.thumbnailImage}
				/>
			</div>

			<div className={styles.info}>
				<div className={styles.titleRow}>
					<h1 className={styles.title}>{toolDetail.name}</h1>
					{toolDetail.nameKo && <span className={styles.subTitle}>{toolDetail.nameKo}</span>}
				</div>
				<p className={styles.description}>{toolDetail.shortDescription}</p>
				<p className={styles.updatedAt}>
					<span className={styles.updatedAtLabel}>최근 업데이트</span>
					{toolDetail.updatedAt}
				</p>
			</div>
		</section>
	);
};
