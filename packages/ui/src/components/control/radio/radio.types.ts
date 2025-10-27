import { createContext } from "react";

export type RadioContext = {
	name: string;
	value?: string;
	setValue: (v: string) => void;
	disabled?: boolean;
};
export const RadioContext = createContext<RadioContext | null>(null);
