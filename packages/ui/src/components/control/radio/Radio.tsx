import type React from "react";
import IcRadioChecked from "../../../assets/icons/btn_radio_active.svg?react";
import IcRadioUnchecked from "../../../assets/icons/btn_radio_normal.svg?react";
import { ToggleBase } from "../_primitives/ToggleBase";
import * as S from "./Radio.css";
import { useRadioContext } from "./RadioGroup";

interface RadioProps {
	value: string;
	disabled?: boolean;
	className?: string;
	children?: React.ReactNode;
}

export const Radio = ({ value, disabled, className, children }: RadioProps) => {
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
			className={`${S.radioItem} ${className ?? ""}`}
		>
			<span className="dot">
				<span className={S.iconUnchecked}>
					<IcRadioUnchecked />
				</span>
				<span className={S.iconChecked}>
					<IcRadioChecked />
				</span>
			</span>
			<span className="label">{children}</span>
		</ToggleBase>
	);
};
