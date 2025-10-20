import type React from "react";
import { useState } from "react";
import { buttonStyle, inputStyle, textFieldRecipe } from "./TextField.css";
import type { TextFieldProps } from "./TextField.types";

const SearchIcon = () => <p>🔍</p>;
const ClearIcon = ({ onClick }: { onClick?: () => void }) => (
	<button type="button" onClick={onClick} className={buttonStyle}>
		X
	</button>
);

export const TextField = ({
	type = "text",
	size,
	disabled,
	className,
	onFocus,
	onBlur,
	value,
	onChange,
	onClear,
	...rest
}: TextFieldProps) => {
	const [isActive, setIsActive] = useState(false);

	const containerClasses = textFieldRecipe({
		size,
		active: isActive,
		disabled,
	});

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsActive(true);
		onFocus?.(e);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsActive(false);
		onBlur?.(e);
	};

	const Icon =
		type === "search" ? (
			<SearchIcon />
		) : (
			value && String(value).length > 0 && <ClearIcon onClick={onClear} />
		);

	return (
		<div className={`${containerClasses} ${className ?? ""}`}>
			<input
				className={inputStyle}
				disabled={disabled}
				onFocus={handleFocus}
				onBlur={handleBlur}
				value={value}
				onChange={onChange}
				{...rest}
			/>
			{Icon}
		</div>
	);
};
