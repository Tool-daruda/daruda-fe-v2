import Image from "next/image";
import * as styles from "./styles/tool-intro-section.css";

type Props = {
	title: string;
	description: string;
	introImages: string[];
};

export const ToolIntroSection = ({ title, description, introImages }: Props) => {
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
		<section className={styles.container}>
			<h2 className={styles.title}>{title}을 소개합니다.</h2>
			<p className={styles.description}>{description}</p>

			<div className={styles.imageGrid}>
				{imageItems.map((item, index) => (
					<div key={item.id} className={styles.imageCard}>
						<Image
							src={item.imageUrl}
							alt={`${title} 이미지 ${index + 1}`}
							fill
							className={styles.image}
						/>
					</div>
				))}
			</div>
		</section>
	);
};
