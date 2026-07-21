"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, useRef, useState } from "react";
import { useImageObjectUrl } from "@/common/hooks/use-image-object-url";
import { uploadImage } from "@/common/utils/upload-image";
import { postCommentAction } from "../_actions/comment-actions";

const MAX_IMAGE_SIZE_MB = 10;

export const useCommentForm = (boardId: number) => {
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
			const photoUrl = image ? await uploadImage(image, "board") : undefined;
			const result = await postCommentAction({
				boardId,
				payload: { content: text, ...(photoUrl && { photoUrl }) },
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

	return {
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
	};
};
