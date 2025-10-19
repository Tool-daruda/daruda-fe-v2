import { style } from "@vanilla-extract/css";

import { themeVars } from "../../foundations";

export const card = style({
	color: themeVars.colors.brand.iris[700],
	alignItems: "center",
	gap: "0.8rem",
	width: "100%",
	position: "relative",
	cursor: "pointer",
	flexShrink: 0,
});
