"use client";

import type { ComponentProps } from "react";
import { btPopup } from "./BtPopup.css";

interface Props extends ComponentProps<"button"> {
	// default, hover, active 대신 용도에 맞는 이름(variant)을 사용했습니다.
	variant?: "primary" | "outline" | "danger";
	children?: React.ReactNode;
}

export const BtPopup = ({ variant = "primary", children = "버튼", ...props }: Props) => {
	return (
		<button className={btPopup({ variant })} {...props}>
			{children}
		</button>
	);
};
