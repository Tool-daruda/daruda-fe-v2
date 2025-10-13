import type { RecipeVariants } from "@vanilla-extract/recipes";
import type { InputHTMLAttributes } from "react";
import type { textAreaRecipe } from "./TextArea.css";

type Variants = RecipeVariants<typeof textAreaRecipe>;

export type TextAreaProps = Variants & {
	type?: "text" | "search";
} & Omit<InputHTMLAttributes<HTMLTextAreaElement>, "size">;
