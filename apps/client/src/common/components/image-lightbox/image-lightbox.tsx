"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useScrollLock } from "@/common/hooks/use-scroll-lock";
import * as s from "./image-lightbox.css";

interface ImageLightboxProps {
	src: string | null;
	onClose: () => void;
	alt?: string;
	maxWidth?: number;
	aspectRatio?: string;
}

export const ImageLightbox = ({
	src,
	onClose,
	alt = "",
	maxWidth = 768,
	aspectRatio = "16/9",
}: ImageLightboxProps) => {
	useScrollLock(!!src);

	useEffect(() => {
		if (!src) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [src, onClose]);

	if (!src) return null;

	return (
		<div className={s.backdrop}>
			<button type="button" className={s.overlayButton} onClick={onClose} aria-label="닫기" />
			<div
				className={s.figure}
				style={{ maxWidth: `min(${maxWidth}px, calc(70vh * ${aspectRatio}))` }}
			>
				<button type="button" className={s.closeButton} onClick={onClose} aria-label="닫기">
					<Image src="/icons/community/ic_cross_36.svg" alt="" width={22} height={22} />
				</button>
				<div className={s.imageWrapper} style={{ aspectRatio }}>
					<Image src={src} alt={alt} fill className={s.image} />
				</div>
			</div>
		</div>
	);
};
