"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { PostDetailImage } from "../_types";
import * as s from "./styles/post-content.css";

interface PostContentProps {
	content: string;
	images: PostDetailImage[];
}

export const PostContent = ({ content, images }: PostContentProps) => {
	const [selectedImage, setSelectedImage] = useState<PostDetailImage | null>(null);

	useEffect(() => {
		if (!selectedImage) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setSelectedImage(null);
		};

		document.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [selectedImage]);

	return (
		<div className={s.wrapper}>
			<p className={s.bodyText}>{content}</p>

			{images.map((image) => (
				<button
					key={image.id}
					type="button"
					className={s.imageButton}
					onClick={() => setSelectedImage(image)}
					aria-label="이미지 크게 보기"
				>
					{image.url && (
						<Image
							src={image.url}
							alt=""
							width={768}
							height={432}
							className={s.image}
							style={{ width: "100%", height: "100%" }}
						/>
					)}
				</button>
			))}

			{selectedImage && (
				<div className={s.lightboxBackdrop}>
					<button
						type="button"
						className={s.lightboxOverlayButton}
						onClick={() => setSelectedImage(null)}
						aria-label="닫기"
					/>
					<div className={s.lightboxFigure}>
						<button
							type="button"
							className={s.lightboxCloseButton}
							onClick={() => setSelectedImage(null)}
							aria-label="닫기"
						>
							<Image src="/icons/community/ic_cross_36.svg" alt="" width={22} height={22} />
						</button>
						<div className={s.lightboxImageWrapper}>
							{selectedImage.url && (
								<Image
									src={selectedImage.url}
									alt=""
									fill
									className={s.image}
									style={{ objectFit: "cover" }}
								/>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
