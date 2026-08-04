import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export { menuWrapper } from "@/common/components/more-menu/dropdown-anchor.css";

export const wrapper = style({
	display: "flex",
	flexDirection: "column",
	gap: "12px",
	width: "100%",
});

export const headRow = style({
	display: "flex",
	alignItems: "center",
	gap: "4px",
	...themeVars.fonts.t4_1,
	color: colors.grayscale[900],
});

export const count = style({
	color: colors.brand.iris[500],
});

export const divider = style({
	width: "100%",
	height: "1px",
	backgroundColor: colors.grayscale[50],
});

export const list = style({
	display: "flex",
	flexDirection: "column",
	gap: "2px",
	width: "100%",
});

export const item = style({
	display: "flex",
	flexDirection: "column",
	gap: "8px",
	width: "100%",
	padding: "14px 8px",
	boxSizing: "border-box",
});

export const itemHead = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%",
});

export const itemHeadLeft = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
});

export const author = style({
	...themeVars.fonts.t4_1,
	color: colors.grayscale[900],
});

export const metaDivider = style({
	width: "1px",
	height: "14px",
	backgroundColor: colors.grayscale[200],
});

export const meta = style({
	...themeVars.fonts.caption1_1,
	color: colors.grayscale[300],
});

export const etcButton = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "24px",
	height: "24px",
	background: "none",
	border: "none",
	padding: 0,
	cursor: "pointer",
});

export const dropdown = style({
	left: 0,
	top: "calc(100% + 4px)",
});

export const content = style({
	margin: 0,
	width: "100%",
	whiteSpace: "pre-wrap",
	wordBreak: "break-word",
	...themeVars.fonts.caption1_1,
	color: colors.grayscale[900],
});

export const image = style({
	position: "relative",
	width: "240px",
	height: "135px",
	borderRadius: "6.5px",
	backgroundColor: colors.grayscale[100],
	overflow: "hidden",
});
