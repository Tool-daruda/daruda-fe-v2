import Image from "next/image";
import { ToolApi } from "@/common/api/tool-api";
import * as styles from "./styles/tool-hero.css";

type Props = {
	toolId: number;
};

export const ToolHero = async ({ toolId }: Props) => {
	const info = await ToolApi.getToolDetail(toolId);

	return (
		<section className={styles.container}>
			<div className={styles.thumbnail}>
				<Image src={info.toolLogo} alt={info.toolMainName} fill className={styles.thumbnailImage} />
			</div>

			<div className={styles.info}>
				<div className={styles.titleRow}>
					<h1 className={styles.title}>{info.toolMainName}</h1>
					{info.toolSubName && <span className={styles.subTitle}>{info.toolSubName}</span>}
				</div>
				<p className={styles.description}>{info.description}</p>
				<p className={styles.updatedAt}>
					<span className={styles.updatedAtLabel}>최근 업데이트</span>
					{info.updatedAt}
				</p>
			</div>
		</section>
	);
};
