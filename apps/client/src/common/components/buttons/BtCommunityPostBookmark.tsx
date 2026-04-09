"use client";

import type { ComponentProps } from "react";
import { btCommunityPostBookmark } from "./BtCommunityPostBookmark.css";

interface Props extends ComponentProps<"button"> {
	state?: "filled" | "subtle";
	count: number;
}

export const BtCommunityPostBookmark = ({ state = "filled", count, ...props }: Props) => {
	const buttonClass = btCommunityPostBookmark({ state });

	const iconSrc =
		state === "filled"
			? "/icons/ic_bookmark_gray0_32.svg" // 꽉 찬 버튼용 흰색 아이콘
			: "/icons/ic_bookmark_iris500_32.svg"; // 연한 버튼용 보라색 아이콘

	return (
		<button className={buttonClass} {...props}>
			<img src={iconSrc} alt="bookmark" width={32} height={32} />
			<span>{count}</span>
		</button>
	);
};
