"use client";

import Image from "next/image";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import * as s from "./styles/comment-input.css";

const MAX_IMAGE_SIZE_MB = 10;

// TODO(api): 등록 클릭 시 댓글 작성 API로 교체됩니다. 첨부 이미지는 실제 업로드 연동이 필요합니다.
export const CommentInput = () => {
	const [text, setText] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imageError, setImageError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const previewUrl = useImageObjectUrl(image);
	const canSubmit = text.trim().length > 0 || image !== null;

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
			setImageError(`파일 크기는 ${MAX_IMAGE_SIZE_MB}MB를 초과할 수 없습니다.`);
			e.target.value = "";
			return;
		}

		setImageError(null);
		setImage(file);
	};

	const removeImage = () => {
		setImage(null);
		setImageError(null);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const handleSubmit = () => {
		if (!canSubmit) return;
		setText("");
		removeImage();
	};

	return (
		<div className={s.wrapper}>
			{previewUrl && (
				<div className={s.imagePreview}>
					{/** biome-ignore lint/performance/noImgElement: 사용자가 선택한 로컬 blob 미리보기라 next/image 최적화 대상이 아닙니다. */}
					<img src={previewUrl} alt={image?.name ?? "첨부 이미지"} className={s.imagePreviewImg} />
					<button
						type="button"
						className={s.imageRemoveButton}
						onClick={removeImage}
						aria-label="첨부 이미지 삭제"
					>
						<Image src="/icons/community/ic_cross_20.svg" alt="" width={10} height={10} />
					</button>
				</div>
			)}

			<div className={s.fieldGroup}>
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="댓글을 작성해 주세요."
					rows={1}
					className={s.textarea}
				/>

				<div className={s.actionsRow}>
					<div className={s.actionsLeft}>
						<label className={s.imageButton} aria-label="이미지 첨부">
							<Image src="/icons/community/ic_image_24.svg" alt="" width={24} height={24} />
							<input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								className={s.hiddenFileInput}
								onChange={handleFileChange}
							/>
						</label>
						{(image || imageError) && (
							<span className={s.warningText}>
								{imageError ?? "이미지는 최대 1장까지 댓글에 첨부할 수 있습니다."}
							</span>
						)}
					</div>

					<button
						type="button"
						className={s.submitButton}
						data-active={canSubmit ? "true" : "false"}
						disabled={!canSubmit}
						onClick={handleSubmit}
					>
						등록
					</button>
				</div>
			</div>
		</div>
	);
};

const useImageObjectUrl = (file: File | null) => {
	const [url, setUrl] = useState<string | null>(null);

	useEffect(() => {
		if (!file) {
			setUrl(null);
			return;
		}

		const objectUrl = URL.createObjectURL(file);
		setUrl(objectUrl);

		return () => {
			URL.revokeObjectURL(objectUrl);
		};
	}, [file]);

	return url;
};
