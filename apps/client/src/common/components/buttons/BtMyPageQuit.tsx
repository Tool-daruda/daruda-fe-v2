"use client";

import type { ComponentProps } from "react";
import { btMyPageQuit } from "./BtMyPageQuit.css";

interface Props extends ComponentProps<"button"> {
	state?: "default";
	children?: React.ReactNode;
}

export const BtMyPageQuit = ({ state = "default", children = "탈퇴하기", ...props }: Props) => {
	return (
		<button className={btMyPageQuit({ state })} {...props}>
			{children}
		</button>
	);
};
