import type { ReactNode } from "react";
import * as S from "./index.css";

interface SectionProps {
	title: string;
	children: ReactNode;
}

export const ToolEditSection = ({ title, children }: SectionProps) => {
	return (
		<section className={S.container}>
			<h2 className={S.title}>{title}</h2>
			<div className={S.content}>{children}</div>
		</section>
	);
};

interface FieldProps {
	label: string;
	children: ReactNode;
}

export const ToolEditField = ({ label, children }: FieldProps) => {
	return (
		<div className={S.fieldStyle}>
			<p className={S.label}>{label}</p>
			{children}
		</div>
	);
};
