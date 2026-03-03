import type { RecipeVariants } from "@vanilla-extract/recipes";
import type { InputHTMLAttributes } from "react";
import type { textFieldRecipe } from "./text-field.css";

type Variants = RecipeVariants<typeof textFieldRecipe>;

export type TextFieldProps = Variants & {
	type?: "text" | "search";
	onClear?: () => void; // x 버튼 클릭
	isError?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;
