"use client";

import { cx } from "@repo/ui";
import Image from "next/image";
import { type DragEvent, useRef, useState } from "react";
import * as s from "./styles/post-image-uploader.css";
import type { ImageSlot } from "./types";

interface PostImageUploaderProps {
	images: ImageSlot[];
	maxCount: number;
	onAddFiles: (files: File[]) => void;
	onRemove: (index: number) => void;
}

export const PostImageUploader = ({
	images,
	maxCount,
	onAddFiles,
	onRemove,
}: PostImageUploaderProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const isFull = images.length >= maxCount;

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		onAddFiles(Array.from(e.dataTransfer.files));
	};

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: 드래그앤드롭 영역으로, 실제 파일 선택은 내부 버튼/입력으로 가능합니다.
		<div
			className={s.wrapper}
			data-dragging={isDragging ? "true" : "false"}
			onDragOver={(e) => {
				e.preventDefault();
				setIsDragging(true);
			}}
			onDragLeave={() => setIsDragging(false)}
			onDrop={handleDrop}
		>
			<button
				type="button"
				className={cx(s.addButton, isFull && s.addButtonDisabled)}
				disabled={isFull}
				onClick={() => fileInputRef.current?.click()}
				aria-label="이미지 첨부"
			>
				<Image src="/icons/community/ic_addimg_36.svg" alt="" width={36} height={34} />
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					multiple
					className={s.hiddenFileInput}
					onChange={(e) => {
						onAddFiles(Array.from(e.target.files || []));
						e.target.value = "";
					}}
				/>
			</button>

			{images.map((image, index) => {
				const src = image.kind === "existing" ? image.url : image.previewUrl;
				const key = image.kind === "existing" ? image.url : image.id;

				return (
					<div key={key} className={s.thumbnail}>
						<Image
							src={src}
							alt=""
							fill
							className={s.thumbnailImg}
							style={{ objectFit: "cover" }}
						/>
						<button
							type="button"
							className={s.removeButton}
							onClick={() => onRemove(index)}
							aria-label="이미지 삭제"
						>
							<Image src="/icons/community/ic_cross_20.svg" alt="" width={10} height={10} />
						</button>
					</div>
				);
			})}
		</div>
	);
};
