"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import * as s from "./styles/post-content.css";

interface PostContentProps {
	content: string;
	images: string[];
}

export const PostContent = ({ content, images }: PostContentProps) => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
							<Image
								src={selectedImage}
								alt=""
								fill
								className={s.image}
								style={{ objectFit: "cover" }}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
