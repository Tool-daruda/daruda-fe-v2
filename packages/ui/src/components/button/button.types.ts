import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonProps = {
	size?: "sm" | "lg" | "icon";
	intent?: "primary" | "dangerous" | "tonal";
	appearance?: "filled" | "outlined";
	rounded?: "rounded" | "pill";
	children: ReactNode;
	onClick: () => void;
	loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
