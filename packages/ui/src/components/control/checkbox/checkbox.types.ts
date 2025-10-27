import { createContext } from "react";

export type CheckboxContextValue = {
	name?: string;
	values: Set<string>;
	toggle: (v: string) => void;
	disabled?: boolean;
};
export const CheckboxContext = createContext<CheckboxContextValue | null>(null);
