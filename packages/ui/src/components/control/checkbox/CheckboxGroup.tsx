import type React from "react";
import { useContext, useId, useState } from "react";
import { CheckboxContext } from "./Checkbox.types";

interface CheckboxGroupProps {
	value?: string[];
	defaultValue?: string[];
	onValueChange?: (v: string[]) => void;
	name?: string;
	disabled?: boolean;
	required?: boolean;
	legend?: React.ReactNode;
	describedById?: string;
	children: React.ReactNode;
	className?: string;
}

export const CheckboxGroup = ({
	value,
	defaultValue,
	onValueChange,
	name,
	disabled,
	legend,
	describedById,
	children,
	className,
}: CheckboxGroupProps) => {
	const id = useId();
	const [internal, setInternal] = useState(new Set(defaultValue ?? []));
	const isCtrl = Array.isArray(value);
	const cur = isCtrl ? new Set(value) : internal;

	const set = (next: Set<string>) => {
		const arr = Array.from(next);
		isCtrl ? onValueChange?.(arr) : setInternal(new Set(arr));
	};

	const toggle = (v: string) => {
		const next = new Set(cur);
		next.has(v) ? next.delete(v) : next.add(v);
		set(next);
	};

	return (
		<fieldset className={className} disabled={disabled} aria-describedby={describedById}>
			{legend && <legend>{legend}</legend>}
			<CheckboxContext.Provider value={{ name: name ?? `cg-${id}`, values: cur, toggle, disabled }}>
				{children}
			</CheckboxContext.Provider>
		</fieldset>
	);
};

export const useCheckboxContext = () => {
	return useContext(CheckboxContext); // null이면 단독 사용
};
