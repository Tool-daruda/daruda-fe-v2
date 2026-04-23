"use client";

import type { ComponentProps } from "react";
import { btToolDetailShare } from "./BtToolDetailShare.css";

interface Props extends ComponentProps<"button"> {
	state?: "default" | "hover";
}

export const BtToolDetailShare = ({ state = "default", ...props }: Props) => {
	// 상태별 아이콘 분기 (경로는 프로젝트에 맞게 수정하세요)
	let iconSrc = "";
	switch (state) {
		case "hover":
			iconSrc = "/icons/ic_share_iris400_25.svg";
			break;
		default:
			iconSrc = "/icons/ic_share_iris300_25.svg";
			break;
	}

	return (
		<button className={btToolDetailShare({ state })} aria-label="공유" {...props}>
			<img src={iconSrc} alt="share" width={16} height={20} />
		</button>
	);
};
