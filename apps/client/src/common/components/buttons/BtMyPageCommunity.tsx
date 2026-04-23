// BtMyPageCommunityButton.tsx
"use client";

import type { ComponentProps } from "react";
import { btMyPageCommunity } from "./BtMyPageCommunity.css";

interface Props extends ComponentProps<"button"> {
	// 상태를 세 가지로 확장합니다.
	state?: "default" | "hover" | "active";
}

export const BtMyPageCommunityButton = ({ state = "default", ...props }: Props) => {
	// vanilla-extract recipe function 호출
	const buttonClass = btMyPageCommunity({ state });

	return (
		<button className={buttonClass} {...props}>
			저장한 글
		</button>
	);
};
