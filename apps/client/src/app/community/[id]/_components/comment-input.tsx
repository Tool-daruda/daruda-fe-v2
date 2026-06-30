"use client";

import Image from "next/image";
import { useState } from "react";
import * as s from "./styles/comment-input.css";

// TODO(api): 등록 클릭 시 댓글 작성 API로 교체됩니다. 이미지 첨부도 실제 업로드 연동이 필요합니다.
export const CommentInput = () => {
	const [text, setText] = useState("");
	const [hasImage, setHasImage] = useState(false);

	const canSubmit = text.trim().length > 0 || hasImage;

	const handleSubmit = () => {
		if (!canSubmit) return;
		setText("");
		setHasImage(false);
	};

	return (
		<div className={s.wrapper}>
			{hasImage && (
				<div className={s.imagePreview}>
					<button
						type="button"
						className={s.imageRemoveButton}
						onClick={() => setHasImage(false)}
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
						<button
							type="button"
							className={s.imageButton}
							onClick={() => setHasImage(true)}
							aria-label="이미지 첨부"
						>
							<Image src="/icons/community/ic_image_24.svg" alt="" width={24} height={24} />
						</button>
						{hasImage && (
							<span className={s.warningText}>
								이미지는 최대 1장까지 댓글에 첨부할 수 있습니다.
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
