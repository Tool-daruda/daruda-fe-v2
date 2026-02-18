import type React from "react";
import { useState } from "react";
import IcClear from "../../../assets/icons/ic_cross.svg?react";
import IcSearch from "../../../assets/icons/ic_search.svg?react";
import {
	buttonStyle,
	inputStyle,
	textFieldActiveStyles,
	textFieldBaseStyle,
	textFieldDisabledStyle,
	textFieldErrorStyle,
	textFieldSizeStyles,
} from "./text-field.css";
import type { TextFieldProps } from "./text-field.types";

export const TextField = ({
	type = "text",
	size = "xl",
	disabled,
	className,
	onFocus,
	onBlur,
	value,
	onChange,
	onClear,
	isError = false,
	...rest
}: TextFieldProps) => {
	const [isActive, setIsActive] = useState(false);

	const sizeClass = textFieldSizeStyles[size];
	const activeClass = isActive ? textFieldActiveStyles.active : textFieldActiveStyles.inactive;
	const disabledClass = disabled ? textFieldDisabledStyle : "";
	const errorClass = isError ? textFieldErrorStyle : "";

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
			<IcSearch />
		) : (
			value &&
			String(value).length > 0 && (
				<button
					type="button"
					onClick={onClear}
					className={buttonStyle}
					aria-label="입력 내용 지우기"
				>
					<IcClear />
				</button>
			)
		);

	return (
		<div
			className={`${textFieldBaseStyle} ${sizeClass} ${activeClass} ${disabledClass} ${errorClass} ${
				className ?? ""
			}`.trim()}
		>
			<input
				className={inputStyle}
				disabled={disabled}
				onFocus={handleFocus}
				onBlur={handleBlur}
				value={value}
				onChange={onChange}
				type={type}
				{...rest}
			/>
			{Icon}
		</div>
	);
};
