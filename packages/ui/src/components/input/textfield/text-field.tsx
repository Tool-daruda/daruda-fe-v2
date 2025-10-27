import type React from "react";
import { useState } from "react";
import IcClear from "../../../assets/icons/ic_cross.svg?react";
import IcSearch from "../../../assets/icons/ic_search.svg?react";
import { buttonStyle, inputStyle, textFieldRecipe } from "./text-field.css";
import type { TextFieldProps } from "./text-field.types";

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
			<IcSearch />
		) : (
			value && String(value).length > 0 && <IcClear onClick={onClear} className={buttonStyle} />
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
