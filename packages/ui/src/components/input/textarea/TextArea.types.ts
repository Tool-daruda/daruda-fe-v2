import type { RecipeVariants } from "@vanilla-extract/recipes";
import type { TextareaHTMLAttributes } from "react";
import type { textAreaRecipe } from "./TextArea.css";

type Variants = RecipeVariants<typeof textAreaRecipe>;

export type TextAreaProps = Variants & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">;
