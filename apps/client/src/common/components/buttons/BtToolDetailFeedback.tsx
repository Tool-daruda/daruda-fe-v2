"use client";

import { typographyTokens } from "@repo/ui/foundations";
import type { ComponentProps } from "react";
import { btToolDetailFeedback } from "./BtToolDetailFeedback.css";

interface Props extends ComponentProps<"button"> {
	state?: "default" | "hover" | "active";
	count?: number; // 아래에 표시될 숫자
}

export const BtToolDetailFeedback = ({ state = "default", count = 1, ...props }: Props) => {
	const buttonClass = btToolDetailFeedback({ state });

	return (
		<button className={buttonClass} {...props}>
			{/* 상단: 하트 아이콘 + 텍스트 */}
			<span style={{ display: "flex", alignItems: "center", gap: "4px", ...typographyTokens.t4_1 }}>
				♥ 도움이 되었어요
			</span>

			{/* 하단: 추천 수 (텍스트보다 약간 작고 얇은 폰트 적용) */}
			<span style={{ ...typographyTokens.b5_2 }}>{count}</span>
		</button>
	);
};
