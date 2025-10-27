import { createContext } from "react";

export type CheckboxContext = {
	name?: string;
	values: Set<string>;
	toggle: (v: string) => void;
	disabled?: boolean;
};
export const CheckboxContext = createContext<CheckboxContext | null>(null);
