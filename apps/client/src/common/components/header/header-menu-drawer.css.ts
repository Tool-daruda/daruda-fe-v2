import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";
import { HEADER_HEIGHT } from "./header.css";

export const dim = style({
	position: "fixed",
	top: HEADER_HEIGHT.mobile,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: "rgba(22, 22, 22, 0.4)",
	zIndex: 10,
	border: "none",
	padding: 0,
});

export const panel = style({
	position: "fixed",
	top: HEADER_HEIGHT.mobile,
	left: 0,
	width: "24rem",
	height: `calc(100dvh - ${HEADER_HEIGHT.mobile})`,
	backgroundColor: colors.grayscale[0],
	overflowY: "auto",
	overscrollBehavior: "contain",
	zIndex: 11,
	paddingBottom: "env(safe-area-inset-bottom)",
	paddingLeft: "env(safe-area-inset-left)",
});

export const list = style({
	display: "flex",
	flexDirection: "column",
	gap: "0.4rem",
	margin: 0,
	padding: 0,
	listStyle: "none",
});

export const item = style({
	display: "flex",
	alignItems: "center",
	padding: "2rem",
	textDecoration: "none",
	...themeVars.fonts.t3_1,
	color: themeVars.colors.grayscale[700],
});

export const itemAccent = style({
	color: colors.brand.iris[500],
});
