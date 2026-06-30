"use client";

import { type ClipboardEvent, useState } from "react";
import type { CommunityFilterTool } from "../../_types";
import { PostImageUploader } from "./post-image-uploader";
import { PostTagSelector } from "./post-tag-selector";
import * as s from "./styles/post-form.css";
import type { ImageSlot, PostFormProps } from "./types";

const MAX_TITLE_LENGTH = 50;
const MAX_CONTENT_LENGTH = 10000;
const MAX_IMAGE_COUNT = 5;
const MAX_IMAGE_SIZE_MB = 7;

export const PostForm = ({ mode, tools, initialValues }: PostFormProps) => {
	const [selectedTool, setSelectedTool] = useState<CommunityFilterTool | null>(
		initialValues?.tool ?? null
	);
	const [title, setTitle] = useState(initialValues?.title ?? "");
	const [content, setContent] = useState(initialValues?.content ?? "");
	const [images, setImages] = useState<ImageSlot[]>(
		() => initialValues?.images.map((url): ImageSlot => ({ kind: "existing", url })) ?? []
	);
	const [imageError, setImageError] = useState<string | null>(null);

	const canSubmit = title.trim().length > 0 && content.trim().length > 0;

	const addFiles = (files: File[]) => {
		const imageFiles = files.filter((file) => file.type.startsWith("image/"));
		if (imageFiles.length === 0) return;

		const remainingSlots = MAX_IMAGE_COUNT - images.length;
		if (remainingSlots <= 0) {
			setImageError(`이미지는 최대 ${MAX_IMAGE_COUNT}장까지 업로드할 수 있습니다.`);
			return;
		}

		const validFiles = imageFiles.filter((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024);
		setImageError(
			validFiles.length < imageFiles.length
				? `이미지는 한 장당 ${MAX_IMAGE_SIZE_MB}MB를 초과할 수 없습니다.`
				: null
		);

		const newSlots: ImageSlot[] = validFiles.slice(0, remainingSlots).map((file) => ({
			kind: "new",
			id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
			file,
			previewUrl: URL.createObjectURL(file),
		}));

		setImages((prev) => [...prev, ...newSlots]);
	};

	const removeImage = (index: number) => {
		setImages((prev) => {
			const target = prev[index];
			if (target?.kind === "new") URL.revokeObjectURL(target.previewUrl);
			return prev.filter((_, i) => i !== index);
		});
	};

	const handlePasteContent = (e: ClipboardEvent<HTMLTextAreaElement>) => {
		const items = Array.from(e.clipboardData?.items || []);
		const files = items
			.filter((item) => item.type.startsWith("image/"))
			.map((item) => item.getAsFile())
			.filter((file): file is File => file !== null);

		if (files.length === 0) return;
		e.preventDefault();
		addFiles(files);
	};

	// TODO(api): 글 작성(POST /api/v1/board) / 수정(PATCH /api/v1/board/{board-id}) 연동이 필요합니다.
	// 이미지는 presigned URL 발급 → S3 업로드 → imageList에 publicUrl을 채우는 흐름으로 연동합니다.
	const handleSubmit = () => {
		if (!canSubmit) return;
	};

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

				<button
					type="button"
					className={s.submitButton}
					data-active={canSubmit ? "true" : "false"}
					disabled={!canSubmit}
					onClick={handleSubmit}
				>
					{mode === "edit" ? "글 수정하기" : "글 작성하기"}
				</button>
			</div>
		</div>
	);
};
