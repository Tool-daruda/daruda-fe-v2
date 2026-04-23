"use client";

import type { ComponentProps } from "react";
import { btSignUp } from "./BtSignUp.css";

interface Props extends ComponentProps<"button"> {
	state?: "default" | "active";
}

export const BtSignUp = ({ state = "default", ...props }: Props) => {
	return (
		<button className={btSignUp({ state })} disabled={state === "default"} {...props}>
			가입하기
		</button>
	);
};
