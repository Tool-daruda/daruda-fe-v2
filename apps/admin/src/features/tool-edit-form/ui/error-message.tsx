import type { ReactNode } from "react";
import { errorRecipe } from "./tool-edit-form.css";

interface ErrorMessageProps {
	children?: ReactNode;
	info?: boolean;
}

const ErrorMessage = ({ children, info = false }: ErrorMessageProps) => {
	if (!children) return;
	const error = errorRecipe({ info });
	return <p className={error}>{children}</p>;
};

export default ErrorMessage;
