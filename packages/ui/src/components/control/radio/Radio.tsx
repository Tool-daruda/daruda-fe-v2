import type React from "react";
import { ToggleBase } from "../_primitives/ToggleBase";
import { useRadioContext } from "./RadioGroup";

interface RadioProps {
	value: string;
	disabled?: boolean;
	className?: string;
	children?: React.ReactNode;
	indicator?: React.ReactNode;
}

export const Radio = ({ value, disabled, className, children, indicator }: RadioProps) => {
	const ctx = useRadioContext();
	const checked = ctx.value === value;
	return (
		<ToggleBase
			type="radio"
			name={ctx.name}
			value={value}
			checked={checked}
			disabled={ctx.disabled || disabled}
			onChange={(next) => next && ctx.setValue(value)}
			className={className}
		>
			<span className="dot">{indicator}</span>
			<span className="label">{children}</span>
		</ToggleBase>
	);
};
