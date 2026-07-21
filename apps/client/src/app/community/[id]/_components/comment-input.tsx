"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { getPresignedUrlAction } from "@/common/api/actions/image.actions";
import { getFileExtension, uploadToS3 } from "@/common/utils/upload-to-s3";
import { postCommentAction } from "../../_actions/comment-actions";
import * as s from "./styles/comment-input.css";

const MAX_IMAGE_SIZE_MB = 10;

export const CommentInput = ({ boardId }: { boardId: number }) => {
	const router = useRouter();
	const [text, setText] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imageError, setImageError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const previewUrl = useImageObjectUrl(image);
	const canSubmit = text.trim().length > 0;

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

	const handleSubmit = async () => {
		if (!canSubmit || isSubmitting) return;
		setIsSubmitting(true);

		try {
			let imageUrl: string | null = null;
			if (image) {
				const urlResult = await getPresignedUrlAction({
					prefix: "board",
					extension: getFileExtension(image),
				});
				if (!urlResult.success) throw new Error(urlResult.error);
				await uploadToS3(urlResult.data.presignedUrl, image);
				imageUrl = urlResult.data.publicUrl;
			}

			const result = await postCommentAction({
				boardId,
				payload: {
					content: text,
					...(imageUrl && { photoUrl: imageUrl }),
				},
			});

			if (!result.success) throw new Error(result.error);

			setText("");
			removeImage();
			setSubmitError(null);
			router.refresh();
		} catch (err) {
			setSubmitError(err instanceof Error ? err.message : "오류가 발생했습니다.");
		} finally {
			setIsSubmitting(false);
		}
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
						data-active={canSubmit && !isSubmitting ? "true" : "false"}
						disabled={!canSubmit || isSubmitting}
						onClick={handleSubmit}
					>
						등록
					</button>
				</div>
			</div>
			{submitError && <p className={s.warningText}>{submitError}</p>}
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
