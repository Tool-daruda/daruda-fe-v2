export interface Option {
	label: string;
	value: string;
}

export type DropdownProps = {
	options: Option[];
	value?: string;
	onChange: (option: Option) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	maxHeight?: number; // 드롭다운 최대 높이
};
