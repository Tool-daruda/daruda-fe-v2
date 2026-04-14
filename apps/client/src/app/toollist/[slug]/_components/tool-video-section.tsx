import Image from "next/image";
import type { ToolMedia } from "../_types";
import * as styles from "./styles/tool-video-section.css";

type Props = {
	items: ToolMedia[];
};

export const ToolVideoSection = ({ items }: Props) => {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>이 영상을 참고해보세요</h2>

			<div className={styles.grid}>
				{items.map((item) => (
					<div key={item.id} className={styles.card}>
						<Image
							src={item.imageUrl}
							alt={item.title ?? `추천 영상 ${item.id}`}
							fill
							className={styles.image}
						/>
					</div>
				))}
			</div>
		</section>
	);
};
