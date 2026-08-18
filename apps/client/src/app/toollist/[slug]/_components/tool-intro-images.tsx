"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageLightbox } from "@/common/components/image-lightbox/image-lightbox";
import * as styles from "./styles/tool-intro-section.css";

type ImageItem = {
	id: string;
	imageUrl: string;
};

type Props = {
	items: ImageItem[];
	toolMainName: string;
};

export const ToolIntroImages = ({ items, toolMainName }: Props) => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const selectedImage = selectedIndex === null ? null : items[selectedIndex];

	return (
		<>
			<div className={styles.imageGrid}>
				{items.map((item, index) => (
					<button
						key={item.id}
						type="button"
						className={styles.imageCard}
						onClick={() => setSelectedIndex(index)}
						aria-label={`${toolMainName} 이미지 ${index + 1} 크게 보기`}
					>
						<Image
							src={item.imageUrl}
							alt={`${toolMainName} 이미지 ${index + 1}`}
							fill
							className={styles.image}
						/>
					</button>
				))}
			</div>

			<ImageLightbox
				src={selectedImage?.imageUrl ?? null}
				onClose={() => setSelectedIndex(null)}
				alt={selectedIndex === null ? "" : `${toolMainName} 이미지 ${selectedIndex + 1}`}
				aspectRatio="43/24"
			/>
		</>
	);
};
