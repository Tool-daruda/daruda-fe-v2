"use client";

import type { ComponentProps } from "react";
import { btChipMainCategory } from "./BtChipMainCategory.css";

interface Props extends ComponentProps<"button"> {
	// 요청하신 세 가지 상태를 props로 받을 수 있게 정의합니다.
	state?: "default" | "hover" | "active";
	// 텍스트를 자유롭게 바꿀 수 있도록 children을 명시적으로 열어둡니다. (기본값: "전체")
	children?: React.ReactNode;
}

export const BtChipMainCategory = ({ state = "default", children = "전체", ...props }: Props) => {
	const buttonClass = btChipMainCategory({ state });

	return (
		<button className={buttonClass} {...props}>
			{children}
		</button>
	);
};
