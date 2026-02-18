import type { TextareaHTMLAttributes } from "react";

export type TextAreaProps = {
	size?: "xl";
	isError?: boolean;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">;
