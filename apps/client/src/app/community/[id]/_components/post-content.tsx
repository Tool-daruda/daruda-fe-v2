"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageLightbox } from "@/common/components/image-lightbox/image-lightbox";
import * as s from "./styles/post-content.css";

interface PostContentProps {
	content: string;
	images: string[];
}

export const PostContent = ({ content, images }: PostContentProps) => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	return (
		<div className={s.wrapper}>
			<p className={s.bodyText}>{content}</p>

			{images.map((image, index) => (
				<button
					// biome-ignore lint/suspicious/noArrayIndexKey: 이미지 URL이 중복될 수 있어 인덱스를 보조 키로 사용합니다.
					key={`${image}-${index}`}
					type="button"
					className={s.imageButton}
					onClick={() => setSelectedImage(image)}
					aria-label="이미지 크게 보기"
				>
					<Image
						src={image}
						alt=""
						width={768}
						height={432}
						className={s.image}
						style={{ width: "100%", height: "100%" }}
					/>
				</button>
			))}

			<ImageLightbox src={selectedImage} onClose={() => setSelectedImage(null)} />
		</div>
	);
};
