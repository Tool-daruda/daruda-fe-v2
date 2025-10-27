import type React from "react";
import { useState } from "react";
import IcCheckboxChecked from "../../../assets/icons/btn_check_active.svg?react";
import IcCheckboxUnchecked from "../../../assets/icons/btn_check_normal.svg?react";
import { ToggleBase } from "../_primitives/toggle-base";
import * as S from "./checkbox.css";
import { useCheckboxContext } from "./checkbox-group";

interface CheckboxProps {
	value?: string; // 그룹
	name?: string; // 단독
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	indeterminate?: boolean;
	disabled?: boolean;
	className?: string;
	children?: React.ReactNode;
}

export const Checkbox = (props: CheckboxProps) => {
	const ctx = useCheckboxContext();
	const inGroup = !!ctx && props.value != null;

	const [uncontrolled, setUncontrolled] = useState<boolean>(!!props.defaultChecked);
	const isControlled = props.checked !== undefined;

	// 현재 체크 상태 계산
	let checked: boolean;
	if (inGroup && ctx && props.value != null) {
		checked = ctx.values.has(props.value); // 그룹
	} else if (isControlled) {
		checked = !!props.checked;
	} else {
		checked = uncontrolled; // 단독
	}

	const handleChange = (next: boolean) => {
		if (inGroup && ctx && props.value != null) {
			ctx.toggle(props.value); // 그룹
		} else if (isControlled) {
			props.onChange?.(next);
		} else {
			setUncontrolled(next);
			props.onChange?.(next);
		}
	};

	return (
		<ToggleBase
			type="checkbox"
			name={inGroup && ctx ? ctx.name : props.name}
			value={props.value}
			checked={checked}
			disabled={(inGroup && ctx ? ctx.disabled : false) || props.disabled}
			onChange={handleChange}
			className={`${S.checkboxItem} ${props.className ?? ""}`}
			indeterminate={props.indeterminate}
		>
			<span className="box">
				<span className={S.iconUnchecked}>
					<IcCheckboxUnchecked />
				</span>
				<span className={S.iconChecked}>
					<IcCheckboxChecked />
				</span>
			</span>
			<span className="label">{props.children}</span>
		</ToggleBase>
	);
};
