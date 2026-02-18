import type React from "react";
import { useState } from "react";
import {
	inputStyle,
	textAreaActiveStyles,
	textAreaBaseStyle,
	textAreaDisabledStyle,
	textAreaErrorStyle,
	textAreaSizeStyle,
} from "./text-area.css";
import type { TextAreaProps } from "./text-area.types";

export const TextArea = ({
	size = "xl",
	disabled,
	className,
	onFocus,
	onBlur,
	value,
	onChange,
	isError = false,
	...rest
}: TextAreaProps) => {
	const [isActive, setIsActive] = useState(false);

	const activeClass = isActive ? textAreaActiveStyles.active : textAreaActiveStyles.inactive;
	const disabledClass = disabled ? textAreaDisabledStyle : "";
	const errorClass = isError ? textAreaErrorStyle : "";

	const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
		setIsActive(true);
		onFocus?.(e);
	};

	const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
		setIsActive(false);
		onBlur?.(e);
	};

	return (
		<div
			className={`${textAreaBaseStyle} ${size === "xl" ? textAreaSizeStyle : ""} ${activeClass} ${disabledClass} ${errorClass} ${
				className ?? ""
			}`.trim()}
		>
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
