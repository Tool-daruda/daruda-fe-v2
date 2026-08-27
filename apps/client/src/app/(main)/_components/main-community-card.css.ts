import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const cardWrapper = style({
	position: "relative",
	width: "100%",
});

export const card = style({
	display: "flex",
	flexDirection: "column",
	gap: "12px",
	width: "100%",
	padding: "12px 16px",
	borderRadius: "16px",
	border: `1px solid ${colors.grayscale[25]}`,
	backgroundColor: colors.grayscale[0],
	textDecoration: "none",
});

export const cardHead = style({
	display: "flex",
	alignItems: "center",
	gap: "10px",
	width: "100%",
	paddingRight: "36px",
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
	position: "relative",
	flexShrink: 0,
	width: "20px",
	height: "20px",
	borderRadius: "4px",
	backgroundColor: colors.grayscale[100],
	overflow: "hidden",
});

export const toolName = style({
	...themeVars.fonts.b5_2,
	color: colors.grayscale[700],
	whiteSpace: "nowrap",
});

export const metaRow = style({
	display: "flex",
	alignItems: "center",
	gap: "8px",
	...themeVars.fonts.b5_3,
	color: colors.grayscale[300],
	whiteSpace: "nowrap",
});

export const divider = style({
	width: "1px",
	height: "10px",
	backgroundColor: colors.grayscale[200],
});

export const etcButton = style({
	position: "absolute",
	top: "12px",
	right: "16px",
	zIndex: 1,
	display: "flex",
	background: "none",
	border: "none",
	padding: 0,
	cursor: "pointer",
});

export const dropdownCard = style({
	right: "16px",
	top: "44px",
});

export const cardBody = style({
	display: "flex",
	alignItems: "flex-start",
	gap: "28px",
	width: "100%",
});

export const cardBodyLeft = style({
	display: "flex",
	flex: 1,
	flexDirection: "column",
	gap: "14px",
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
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
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
	gap: "2px",
	...themeVars.fonts.caption2_2,
	color: colors.grayscale[300],
});

export const thumbnail = style({
	position: "relative",
	flexShrink: 0,
	width: "80px",
	height: "80px",
	borderRadius: "8px",
	backgroundColor: colors.grayscale[50],
	overflow: "hidden",
});
