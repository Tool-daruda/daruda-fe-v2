import type React from "react";
import { useId, useRef } from "react";

type CommonBase = {
	id?: string;
	name?: string;
	disabled?: boolean;
	required?: boolean;
	invalid?: boolean;
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
};

type CheckboxBase = CommonBase & {
	type: "checkbox";
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	value?: string;
};

type RadioBase = CommonBase & {
	type: "radio";
	value: string;
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
};

export type ToggleBaseProps = CheckboxBase | RadioBase;

export function ToggleBase(props: ToggleBaseProps) {
	const { type, id: idProp, name, disabled, required, invalid, className, style, children } = props;

	const reactId = useId();
	const id = idProp ?? `ctrl-${reactId}`;
	const inputRef = useRef<HTMLInputElement>(null);

	const checked = props.checked;
	const defaultChecked = props.defaultChecked;
	const onChange = props.onChange;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.checked);
	};

	return (
		<label
			htmlFor={id}
			className={className}
			style={style}
			data-disabled={disabled ? "" : undefined}
			data-invalid={invalid ? "" : undefined}
			data-state={checked ? "checked" : "unchecked"}
		>
			{/* 실제 input */}
			<input
				ref={inputRef}
				id={id}
				name={name}
				type={type}
				value={props.value}
				disabled={disabled}
				required={required}
				aria-invalid={invalid || undefined}
				checked={checked}
				defaultChecked={defaultChecked}
				onChange={handleChange}
				style={{
					position: "absolute",
					opacity: 0,
					pointerEvents: "none",
					width: 0,
					height: 0,
				}}
			/>
			{/* 커스텀 input */}
			<span className="ctrl-visual">{children}</span>
		</label>
	);
}
