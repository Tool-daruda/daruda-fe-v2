import type { ReactNode } from "react";
import * as S from "./tool-edit-form.css";

interface ErrorMessageProps {
	children?: ReactNode;
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
	if (!children) return;
	return <p className={S.errorStyle}>{children}</p>;
};

export default ErrorMessage;
