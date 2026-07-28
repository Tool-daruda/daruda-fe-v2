"use client";

import { useRouter } from "next/navigation";
import { type ClipboardEvent, useEffect, useRef, useState } from "react";
import { uploadImage } from "@/common/utils/upload-image";
import { createBoardAction, updateBoardAction } from "../_actions/board-actions";
import type { ImageSlot, PostFormInitialValues } from "../_components/post-form/types";
import type { CommunityFilterTool } from "../_types";

const MAX_IMAGE_COUNT = 5;
const MAX_IMAGE_SIZE_MB = 7;

interface UsePostFormProps {
	mode: "create" | "edit";
	initialValues?: PostFormInitialValues;
}

export const usePostForm = ({ mode, initialValues }: UsePostFormProps) => {
	const router = useRouter();
	const [selectedTool, setSelectedTool] = useState<CommunityFilterTool | null>(
		initialValues?.tool ?? null
	);
	const [title, setTitle] = useState(initialValues?.title ?? "");
	const [content, setContent] = useState(initialValues?.content ?? "");
	const [images, setImages] = useState<ImageSlot[]>(
		() => initialValues?.images.map((url): ImageSlot => ({ kind: "existing", url })) ?? []
	);
	const [imageError, setImageError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const imagesRef = useRef(images);
	imagesRef.current = images;

	useEffect(() => {
		return () => {
			for (const slot of imagesRef.current) {
				if (slot.kind === "new") URL.revokeObjectURL(slot.previewUrl);
			}
		};
	}, []);

	const canSubmit = title.trim().length > 0 && content.trim().length > 0;

	const addFiles = (files: File[]) => {
		const imageFiles = files.filter((f) => f.type.startsWith("image/"));
		if (imageFiles.length === 0) return;

		const remainingSlots = MAX_IMAGE_COUNT - images.length;
		if (remainingSlots <= 0) {
			setImageError(`이미지는 최대 ${MAX_IMAGE_COUNT}장까지 업로드할 수 있습니다.`);
			return;
		}

		const validFiles = imageFiles.filter((f) => f.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024);
		const truncatedBySlot = validFiles.length > remainingSlots;
		setImageError(
			validFiles.length < imageFiles.length
				? `이미지는 한 장당 ${MAX_IMAGE_SIZE_MB}MB를 초과할 수 없습니다.`
				: truncatedBySlot
					? `이미지는 최대 ${MAX_IMAGE_COUNT}장까지 업로드할 수 있습니다.`
					: null
		);

		const newSlots: ImageSlot[] = validFiles.slice(0, remainingSlots).map((f) => ({
			kind: "new",
			id: `${f.name}-${f.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
			file: f,
			previewUrl: URL.createObjectURL(f),
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
			.filter((f): f is File => f !== null);
		if (files.length === 0) return;
		e.preventDefault();
		addFiles(files);
	};

	const handleSubmit = async () => {
		if (!canSubmit || isSubmitting) return;
		setIsSubmitting(true);
		setSubmitError(null);
		try {
			const imageUrls = await Promise.all(
				images.map((slot) =>
					slot.kind === "existing" ? slot.url : uploadImage(slot.file, "board")
				)
			);
			const toolId = selectedTool?.toolId ?? null;
			const payload = {
				title,
				content,
				imageList: imageUrls,
				toolId,
				isFree: toolId === null,
			};
			const result =
				mode === "edit" && initialValues?.boardId
					? await updateBoardAction({
							boardId: initialValues.boardId,
							payload,
							oldToolId: initialValues.tool?.toolId,
						})
					: await createBoardAction(payload);
			if (!result.success) throw new Error(result.error);
			router.push(`/community/${result.data.boardId}`);
		} catch (err) {
			setSubmitError(err instanceof Error ? err.message : "오류가 발생했습니다.");
			setIsSubmitting(false);
		}
	};

	return {
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
	};
};
