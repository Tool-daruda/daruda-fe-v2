"use client";

import type { ComponentProps } from "react";
import { btCommunityCmtSummit } from "./BtCommunityCmtSummit.css";

interface Props extends ComponentProps<"button"> {
	state?: "active" | "default";
}

export const BtCommunityCmtSummit = ({ state = "active", ...props }: Props) => {
	const buttonClass = btCommunityCmtSummit({ state });

	return (
		<button className={buttonClass} {...props}>
			등록
		</button>
	);
};
