"use client";

import { usePostForm } from "../../_hooks/use-post-form";
import { PostImageUploader } from "./post-image-uploader";
import { PostTagSelector } from "./post-tag-selector";
import * as s from "./styles/post-form.css";
import type { PostFormProps } from "./types";

const MAX_TITLE_LENGTH = 50;
const MAX_CONTENT_LENGTH = 10000;
const MAX_IMAGE_COUNT = 5;
const MAX_IMAGE_SIZE_MB = 7;

export const PostForm = ({ mode, tools, initialValues }: PostFormProps) => {
	const {
		selectedTool,
		setSelectedTool,
		title,
		setTitle,
		content,
		setContent,
		images,
		imageError,
		isSubmitting,
		submitError,
		canSubmit,
		addFiles,
		removeImage,
		handlePasteContent,
		handleSubmit,
	} = usePostForm({ mode, initialValues });

	return (
		<div className={s.container}>
			<h1 className={s.heading}>{mode === "edit" ? "글 수정하기" : "글 작성하기"}</h1>

			<PostTagSelector tools={tools} selectedTool={selectedTool} onSelectTool={setSelectedTool} />

			<div className={s.fieldsSection}>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="제목을 입력해주세요."
					maxLength={MAX_TITLE_LENGTH}
					className={s.titleInput}
				/>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					onPaste={handlePasteContent}
					placeholder="본문을 입력해주세요."
					maxLength={MAX_CONTENT_LENGTH}
					className={s.bodyTextarea}
				/>
				<PostImageUploader
					images={images}
					maxCount={MAX_IMAGE_COUNT}
					onAddFiles={addFiles}
					onRemove={removeImage}
				/>
				{imageError && <p className={s.imageError}>{imageError}</p>}
			</div>

			<div className={s.footerRow}>
				<ul className={s.helperList}>
					<li>제목은 공백 포함 {MAX_TITLE_LENGTH}자 이내로 입력해 주세요</li>
					<li>본문은 공백 포함 1만 자 이내로 입력해 주세요</li>
					<li>이미지는 붙여넣기, 끌어오기, 파일 첨부하기로 선택할 수 있습니다</li>
					<li>
						이미지는 최대 {MAX_IMAGE_COUNT}장 업로드할 수 있으며, 한 장당 {MAX_IMAGE_SIZE_MB}
						MB입니다
					</li>
				</ul>

				<div className={s.submitArea}>
					{submitError && <p className={s.submitError}>{submitError}</p>}
					<button
						type="button"
						className={s.submitButton}
						data-active={canSubmit && !isSubmitting ? "true" : "false"}
						disabled={!canSubmit || isSubmitting}
						onClick={handleSubmit}
					>
						{isSubmitting ? "저장 중..." : mode === "edit" ? "글 수정하기" : "글 작성하기"}
					</button>
				</div>
			</div>
		</div>
	);
};
