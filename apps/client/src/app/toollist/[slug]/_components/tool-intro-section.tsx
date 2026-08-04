import Image from "next/image";
import { ToolApi } from "@/common/api/tool-api";
import { withObjectJosa } from "@/common/utils";
import { TOOL_SECTION_IDS } from "../_constants/toc";
import * as styles from "./styles/tool-intro-section.css";

type Props = {
	toolId: number;
};

export const ToolIntroSection = async ({ toolId }: Props) => {
	const info = await ToolApi.getToolDetail(toolId);

	if (!info) return null;
	const introImages = info.images || [];

	const imageCountByUrl = new Map<string, number>();
	const imageItems = introImages.map((imageUrl) => {
		const imageCount = (imageCountByUrl.get(imageUrl) ?? 0) + 1;
		imageCountByUrl.set(imageUrl, imageCount);

		return {
			id: `${imageUrl}-${imageCount}`,
			imageUrl,
		};
	});

	return (
		<section id={TOOL_SECTION_IDS.intro} className={styles.container}>
			<h2 className={styles.title}>{withObjectJosa(info.toolMainName)} 소개합니다.</h2>
			<p className={styles.description}>{info.description}</p>

			<div className={styles.imageGrid}>
				{imageItems.map((item, index) => (
					<div key={item.id} className={styles.imageCard}>
						<Image
							src={item.imageUrl}
							alt={`${info.toolMainName} 이미지 ${index + 1}`}
							fill
							className={styles.image}
						/>
					</div>
				))}
			</div>
		</section>
	);
};
