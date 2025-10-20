import type { RecipeVariants } from "@vanilla-extract/recipes";
import type { dropdownTriggerRecipe } from "./Dropdown.css";

type Variants = RecipeVariants<typeof dropdownTriggerRecipe>;

export interface Option {
	label: string;
	value: string;
}

export type DropdownProps = Variants & {
	options: Option[];
	value?: string;
	onChange: (option: Option) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	maxHeight?: number; // 드롭다운 최대 높이
};
