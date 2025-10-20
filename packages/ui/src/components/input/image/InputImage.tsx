import type React from "react";
import { useEffect, useMemo, useRef } from "react";
import * as S from "./InputImage.css";
import type { InputImageProps } from "./InputImage.types";

const AddIcon = () => <span>+</span>;
const RemoveIcon = () => <span>x</span>;

export const InputImage = ({
	existingImages = [],
	newImages = [],
	onImageChange,
	onDeleteExisting,
	onDeleteNew,
	maxCount = 5,
	maxSizeMB = 7,
	accept = "image/*",
	disabled = false,
	onValidationError,
	uploadAriaLabel = "이미지 업로드",
	removeAriaLabel = "이미지 삭제",
	className,
}: InputImageProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const currentCount = existingImages.length + newImages.length;
	const canUpload = !disabled && currentCount < maxCount;

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (files.length === 0) return;

		if (currentCount + files.length > maxCount) {
			onValidationError?.({
				type: "MAX_COUNT",
				message: `이미지는 최대 ${maxCount}장까지 첨부할 수 있습니다.`,
			});
			return;
		}

		const validFiles = files.filter((file) => {
			if (file.size > maxSizeMB * 1024 * 1024) {
				onValidationError?.({
					type: "MAX_SIZE",
					message: `파일 크기는 ${maxSizeMB}MB를 초과할 수 없습니다.`,
				});
				return false;
			}
			return true;
		});

		if (validFiles.length > 0) {
			onImageChange([...newImages, ...validFiles]);
		}

		if (inputRef.current) {
			inputRef.current.value = "";
		}
	};

	const objectUrls = useMemo(() => newImages.map((file) => URL.createObjectURL(file)), [newImages]);

	useEffect(() => {
		return () => {
			objectUrls.forEach((url) => {
				URL.revokeObjectURL(url);
			});
		};
	}, [objectUrls]);

	return (
		<div className={`${S.containerStyle} ${className ?? ""}`}>
			<div className={S.previewContainerStyle}>
				{canUpload && (
					<label className={S.uploadButtonRecipe({ disabled })} aria-label={uploadAriaLabel}>
						<AddIcon />
						<input
							ref={inputRef}
							type="file"
							multiple
							accept={accept}
							className={S.inputStyle}
							onChange={handleFileChange}
							disabled={!canUpload}
						/>
					</label>
				)}
				{existingImages.map((url) => (
					<div key={url} className={S.imagePreviewStyle}>
						<img src={url} alt="기존 이미지" />
						<button
							className={S.removeButtonRecipe({ disabled })}
							onClick={() => onDeleteExisting?.(url)}
							aria-label={`${removeAriaLabel}: ${url}`}
							type="button"
							disabled={disabled}
						>
							<RemoveIcon />
						</button>
					</div>
				))}
				{newImages.map((file, idx) => (
					<div key={file.name} className={S.imagePreviewStyle}>
						<img src={objectUrls[idx]} alt={file.name} />
						<button
							className={S.removeButtonRecipe({ disabled })}
							onClick={() => onDeleteNew?.(file)}
							aria-label={`${removeAriaLabel}: ${file.name}`}
							type="button"
							disabled={disabled}
						>
							<RemoveIcon />
						</button>
					</div>
				))}
			</div>
		</div>
	);
};
