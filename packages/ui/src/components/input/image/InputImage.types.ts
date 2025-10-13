import type { RecipeVariants } from "@vanilla-extract/recipes";
import type { uploadButtonRecipe } from "./InputImage.css";

type ButtonVariants = RecipeVariants<typeof uploadButtonRecipe>;

export type InputImageProps = ButtonVariants & {
	existingImages?: string[]; // 기존 이미지 배열
	newImages?: File[]; // 새로 추가된 이미지 파일 배열
	onImageChange: (files: File[]) => void; 
	onDeleteExisting?: (url: string) => void; 
	onDeleteNew?: (file: File) => void; 
	maxCount?: number; // 최대 업로드 가능한 이미지 개수
	maxSizeMB?: number; // 파일당 최대 크기 (MB)
	accept?: string; // 허용할 파일 타입
	disabled?: boolean; // 업로드 비활성화 여부
	onValidationError?: (error: { // 유효성 검사 실패 시 호출되는 콜백
		type: "MAX_COUNT" | "MAX_SIZE" | "EMPTY";
		message: string;
	}) => void; 
	uploadAriaLabel?: string;
	removeAriaLabel?: string;
	className?: string;
};
