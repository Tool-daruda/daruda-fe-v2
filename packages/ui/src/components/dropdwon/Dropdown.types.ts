// packages/ui/src/components/dropdown/Dropdown.types.ts

import type { RecipeVariants } from "@vanilla-extract/recipes";
import type { dropdownTriggerRecipe } from "./Dropdown.css";

// Recipe의 variant 타입을 가져옵니다 (e.g., open 상태)
type Variants = RecipeVariants<typeof dropdownTriggerRecipe>;

// 드롭다운의 각 옵션에 대한 타입
export interface Option {
	label: string;
	value: string;
}

// 최종 Dropdown 컴포넌트의 Props 타입
export type DropdownProps = Variants & {
	/** 드롭다운에 표시될 옵션 목록 */
	options: Option[];
	/** 현재 선택된 옵션의 value */
	value?: string;
	/** 옵션이 선택되었을 때 호출되는 콜백 함수 */
	onChange: (option: Option) => void;
	/** 선택된 값이 없을 때 표시될 텍스트 */
	placeholder?: string;
	/** 컴포넌트를 비활성화할지 여부 */
	disabled?: boolean;
	/** 커스텀 클래스 */
	className?: string;
	maxHeight?: number; // 드롭다운 최대 높이
};
