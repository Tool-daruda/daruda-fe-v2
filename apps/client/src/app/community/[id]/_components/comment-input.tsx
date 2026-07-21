"use client";

import Image from "next/image";
import { useCommentForm } from "../../_hooks/use-comment-form";
import * as s from "./styles/comment-input.css";

export const CommentInput = ({ boardId }: { boardId: number }) => {
	const {
		text,
		setText,
		image,
		previewUrl,
		imageError,
		submitError,
		canSubmit,
		isSubmitting,
		fileInputRef,
		handleFileChange,
		removeImage,
		handleSubmit,
	} = useCommentForm(boardId);

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
