import type { InputHTMLAttributes } from "react";

export type TextFieldProps = {
	size?: "xl" | "s";
	type?: "text" | "search";
	onClear?: () => void; // x 버튼 클릭
	isError?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;
