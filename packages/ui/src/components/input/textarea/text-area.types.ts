import type { RecipeVariants } from "@vanilla-extract/recipes";
import type { TextareaHTMLAttributes } from "react";
import type { textAreaRecipe } from "./text-area.css";

type Variants = RecipeVariants<typeof textAreaRecipe>;

export type TextAreaProps = Variants & { isError?: boolean } & Omit<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		"size"
	>;
