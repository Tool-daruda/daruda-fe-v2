"use client";

import type { ComponentProps } from "react";
import { btMyPageSave } from "./BtMyPageSave.css";

interface Props extends ComponentProps<"button"> {
	state?: "active" | "default";
}

export const BtMyPageSave = ({ state = "active", ...props }: Props) => {
	return (
		<button className={btMyPageSave({ state })} disabled={state === "default"} {...props}>
			저장
		</button>
	);
};
