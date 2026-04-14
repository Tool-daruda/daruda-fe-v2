import Image from "next/image";
import * as styles from "./styles/tool-intro-section.css";

type Props = {
	title: string;
	description: string;
	introImages: string[];
};

export const ToolIntroSection = ({ title, description, introImages }: Props) => {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>{title}을 소개합니다.</h2>
			<p className={styles.description}>{description}</p>

			<div className={styles.imageGrid}>
				{introImages.map((imageUrl, index) => (
					<div key={imageUrl} className={styles.imageCard}>
						<Image
							src={imageUrl}
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
