import type React from "react";
import { useContext, useId, useState } from "react";
import { RadioContext } from "./Radio.types";

interface RadioGroupProps {
	value?: string;
	defaultValue?: string;
	onValueChange?: (v: string) => void;
	name?: string;
	disabled?: boolean;
	orientation?: "horizontal" | "vertical";
	children: React.ReactNode;
}

export const RadioGroup = ({
	value,
	defaultValue,
	onValueChange,
	name,
	disabled,
	orientation = "vertical",
	children,
}: RadioGroupProps) => {
	const id = useId();
	const groupName = name ?? `rg-${id}`;
	const [internal, setInternal] = useState(defaultValue);
	const isCtrl = value !== undefined;
	const cur = isCtrl ? value : internal;
	const set = (v: string) => (isCtrl ? onValueChange?.(v) : setInternal(v));

	return (
		<div role="radiogroup" data-orientation={orientation}>
			<RadioContext.Provider value={{ name: groupName, value: cur, setValue: set, disabled }}>
				{children}
			</RadioContext.Provider>
		</div>
	);
};

export const useRadioContext = () => {
	const ctx = useContext(RadioContext);
	if (!ctx) throw new Error("라디오 그룹 내부에서만 사용 가능합니다.");
	return ctx;
};
