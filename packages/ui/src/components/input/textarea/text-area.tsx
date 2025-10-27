import type React from "react";
import { useState } from "react";
import { inputStyle, textAreaRecipe } from "./text-area.css";
import type { TextAreaProps } from "./text-area.types";

export const TextArea = ({
	size,
	disabled,
	className,
	onFocus,
	onBlur,
	value,
	onChange,
	...rest
}: TextAreaProps) => {
	const [isActive, setIsActive] = useState(false);

	const containerClasses = textAreaRecipe({
		size,
		active: isActive,
		disabled,
	});

	const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
		setIsActive(true);
		onFocus?.(e);
	};

	const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
		setIsActive(false);
		onBlur?.(e);
	};

	return (
		<div className={`${containerClasses} ${className ?? ""}`}>
			<textarea
				className={inputStyle}
				disabled={disabled}
				onFocus={handleFocus}
				onBlur={handleBlur}
				value={value}
				onChange={onChange}
				{...rest}
			/>
		</div>
	);
};
