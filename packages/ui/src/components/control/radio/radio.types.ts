import { createContext } from "react";

export type RadioContextValue = {
	name: string;
	value?: string;
	setValue: (v: string) => void;
	disabled?: boolean;
};
export const RadioContext = createContext<RadioContextValue | null>(null);
