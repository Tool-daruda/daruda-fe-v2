import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const wrapper = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-end",
	gap: "10px",
	width: "100%",
});

export const sortRow = style({
	display: "flex",
	alignItems: "center",
	gap: "8px",
});

export const sortItem = style({
	background: "none",
	border: "none",
	padding: "2px 4px",
	cursor: "pointer",
	...themeVars.fonts.b4_1,
	color: colors.grayscale[300],

	selectors: {
		"&[data-active='true']": {
			color: colors.grayscale[700],
		},
	},
});

export const sortDivider = style({
	width: "1px",
	height: "10px",
	backgroundColor: colors.grayscale[200],
});

export const list = style({
	display: "flex",
	flexDirection: "column",
	gap: "12px",
	width: "100%",
});

export const itemDivider = style({
	width: "100%",
	height: "1px",
	backgroundColor: colors.grayscale[50],
});

export const card = style({
	display: "flex",
	flexDirection: "column",
	gap: "16px",
	width: "100%",
	padding: "12px",
	borderRadius: "16px",
	backgroundColor: colors.grayscale[0],
	textDecoration: "none",
});

export const cardHead = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%",
});

export const cardHeadLeft = style({
	display: "flex",
	alignItems: "center",
	gap: "10px",
});

export const toolChip = style({
	display: "flex",
	alignItems: "center",
	gap: "5px",
	padding: "4px 6px 4px 4px",
	borderRadius: "8px",
	backgroundColor: colors.grayscale[25],
});

export const toolLogo = style({
	flexShrink: 0,
	width: "20px",
	height: "20px",
	borderRadius: "4px",
	backgroundColor: colors.grayscale[100],
});

export const toolName = style({
	...themeVars.fonts.b5_2,
	color: colors.grayscale[700],
	whiteSpace: "nowrap",
});

export const metaRow = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
	...themeVars.fonts.b5_3,
	color: colors.grayscale[300],
	whiteSpace: "nowrap",
});

export const metaDivider = style({
	width: "1px",
	height: "10px",
	backgroundColor: colors.grayscale[200],
});

export const etcButton = style({
	display: "flex",
	background: "none",
	border: "none",
	padding: "4px",
	cursor: "pointer",
});

export const cardBody = style({
	display: "flex",
	gap: "28px",
	height: "92px",
	width: "100%",
});

export const cardBodyLeft = style({
	display: "flex",
	flex: 1,
	flexDirection: "column",
	justifyContent: "space-between",
	minWidth: 0,
});

export const textBlock = style({
	display: "flex",
	flexDirection: "column",
	gap: "4px",
});

export const cardTitle = style({
	...themeVars.fonts.t4_1,
	color: colors.grayscale[900],
	margin: 0,
});

export const cardContent = style({
	...themeVars.fonts.caption1_1,
	color: colors.grayscale[600],
	margin: 0,
	height: "40px",
	overflow: "hidden",
	display: "-webkit-box",
	WebkitLineClamp: 2,
	WebkitBoxOrient: "vertical",
});

export const statsRow = style({
	display: "flex",
	alignItems: "center",
	gap: "8px",
});

export const statItem = style({
	display: "flex",
	alignItems: "center",
	gap: "4px",
	...themeVars.fonts.caption2_1,
	color: colors.grayscale[300],
});

export const statDivider = style({
	width: "1px",
	height: "10px",
	backgroundColor: colors.grayscale[200],
});

export const thumbnail = style({
	flexShrink: 0,
	width: "92px",
	height: "92px",
	borderRadius: "8px",
	backgroundColor: colors.grayscale[50],
	position: "relative",
	overflow: "hidden",
});

export const emptyState = style({
	width: "100%",
	padding: "60px 0",
	textAlign: "center",
	...themeVars.fonts.b4_2,
	color: colors.grayscale[300],
});
