"use client";

import type { ComponentProps } from "react";
import { btToolDetailBookmark } from "./BtToolDetailBookmark.css";

interface Props extends ComponentProps<"button"> {
	state?: "default" | "hover" | "active";
}

export const BtToolDetailBookmark = ({ state = "default", ...props }: Props) => {
	const buttonClass = btToolDetailBookmark({ state });

	// 상태에 따른 아이콘 경로 분기 로직
	let iconSrc = "";
	switch (state) {
		case "hover":
			iconSrc = "/icons/ic_bookmark_iris400_20.svg"; // 호버 시: 보라색 아이콘
			break;
		case "active":
			iconSrc = "/icons/ic_bookmark_iris500_20.svg"; // 활성화 시: 흰색 아이콘
			break;
		default:
			iconSrc = "/icons/ic_bookmark_iris300_20.svg"; // 기본 : 보라색 아이콘
			break;
	}

	return (
		<button className={buttonClass} {...props}>
			{/* 아이콘 직접 삽입 */}
			<img src={iconSrc} alt="bookmark" width={12} height={14} />
		</button>
	);
};
