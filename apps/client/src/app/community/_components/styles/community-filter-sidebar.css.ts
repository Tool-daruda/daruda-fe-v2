import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

const LIST_ROW_HEIGHT = 48;
const VISIBLE_ROW_COUNT = 11;

export const root = style({
	position: "sticky",
	top: "24px",
	flexShrink: 0,
	width: "192px",
	alignSelf: "flex-start",
	zIndex: 1,
});

export const card = style({
	display: "flex",
	flexDirection: "column",
	width: "192px",
	maxHeight: "calc(100vh - 48px)",
	overflow: "hidden",
	backgroundColor: colors.grayscale[0],
	border: `1px solid ${colors.grayscale[50]}`,
	borderRadius: "16px",
});

export const head = style({
	flexShrink: 0,
	display: "flex",
	flexDirection: "column",
	gap: "12px",
	padding: "16px",
});

export const titleRow = style({
	display: "flex",
	alignItems: "center",
	gap: "2px",
});

export const title = style({
	...themeVars.fonts.h4_2,
	color: colors.grayscale[900],
});

export const infoWrapper = style({
	position: "relative",
	display: "flex",
});

export const infoButton = style({
	display: "flex",
	background: "none",
	border: "none",
	padding: 0,
	cursor: "pointer",
});

const tooltipColor = "rgba(22, 22, 22, 0.7)";

export const tooltipWrapper = style({
	position: "absolute",
	left: "calc(100% + 6px)",
	top: "50%",
	transform: "translateY(-50%)",
	display: "flex",
	alignItems: "center",
	zIndex: 30,
});

export const tooltipTail = style({
	flexShrink: 0,
	width: 0,
	height: 0,
	borderTop: "9px solid transparent",
	borderBottom: "9px solid transparent",
	borderRight: `9px solid ${tooltipColor}`,
});

export const tooltipBubble = style({
	width: "220px",
	padding: "12px 19px 12px 20px",
	borderRadius: "10px",
	backgroundColor: tooltipColor,
	color: colors.grayscale[0],
	...themeVars.fonts.b4_2,
});

export const emptyLabel = style({
	display: "block",
	width: "100%",
	background: "none",
	border: "none",
	padding: 0,
	textAlign: "left",
	cursor: "default",
	...themeVars.fonts.t5_1,
	color: colors.grayscale[200],
});

export const chipList = style({
	display: "flex",
	flexDirection: "column",
	gap: "6px",
});

export const chip = style({
	display: "flex",
	alignItems: "center",
	gap: "5px",
	padding: "4px 6px 4px 4px",
	borderRadius: "8px",
	backgroundColor: colors.grayscale[25],
	width: "fit-content",
	maxWidth: "100%",
});

export const chipLogo = style({
	position: "relative",
	flexShrink: 0,
	width: "20px",
	height: "20px",
	borderRadius: "4px",
	backgroundColor: colors.grayscale[100],
	overflow: "hidden",
});

export const chipName = style({
	...themeVars.fonts.b5_2,
	color: colors.grayscale[700],
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

export const chipRemove = style({
	flexShrink: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "20px",
	height: "20px",
	background: "none",
	border: "none",
	padding: 0,
	cursor: "pointer",
});

export const searchSection = style({
	flexShrink: 0,
	padding: "0 12px 8px",
});

export const searchInputWrapper = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
	width: "100%",
	boxSizing: "border-box",
	padding: "7px 12px 7px 10px",
	borderRadius: "999px",
	border: `1px solid ${colors.grayscale[50]}`,
	backgroundColor: colors.grayscale[0],
	transition: "border-color 0.15s ease",

	selectors: {
		"&[data-active='true']": {
			borderColor: colors.grayscale[400],
		},
	},
});

export const searchInput = style({
	flex: 1,
	minWidth: 0,
	border: "none",
	outline: "none",
	background: "transparent",
	...themeVars.fonts.t5_1,
	color: colors.grayscale[900],

	"::placeholder": {
		color: colors.grayscale[200],
	},
});

export const listSection = style({
	flex: 1,
	overflowY: "auto",
	overflowX: "hidden",
	display: "flex",
	flexDirection: "column",
	borderBottomLeftRadius: "16px",
	borderBottomRightRadius: "16px",

	selectors: {
		"&[data-capped='true']": {
			flex: "none",
			maxHeight: `${LIST_ROW_HEIGHT * VISIBLE_ROW_COUNT}px`,
		},
	},
});

export const freeRow = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "12px 18px 12px 16px",
	background: "none",
	border: "none",
	borderTop: `1px solid ${colors.grayscale[25]}`,
	cursor: "pointer",
	width: "100%",
	textAlign: "left",
});

export const freeLabel = style({
	...themeVars.fonts.t4_1,
	fontWeight: 700,
	color: colors.grayscale[900],
});

export const categoryRow = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "12px 16px",
	background: "none",
	border: "none",
	borderTop: `1px solid ${colors.grayscale[25]}`,
	cursor: "pointer",
	width: "100%",
	textAlign: "left",
	transition: "background-color 0.15s ease",

	":hover": {
		backgroundColor: colors.grayscale[25],
	},
});

export const categoryRowActive = style({
	backgroundColor: colors.brand.iris[50],
});

export const categoryLabel = style({
	...themeVars.fonts.t4_1,
	color: colors.grayscale[900],
});

export const categoryLabelActive = style({
	color: colors.brand.iris[600],
});

export const toolRow = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%",
	padding: "8px 16px",
	background: "none",
	border: "none",
	cursor: "pointer",
});

export const toolRowInner = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
	flex: 1,
	minWidth: 0,
	padding: "6px 8px",
	borderRadius: "4px",
	transition: "background-color 0.15s ease",

	selectors: {
		"&[data-selected='true']": {
			backgroundColor: colors.grayscale[700],
		},
	},
});

export const toolRowInnerHover = style({
	":hover": {
		backgroundColor: colors.grayscale[30],
	},
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
	color: colors.grayscale[900],
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",

	selectors: {
		[`${toolRowInner}[data-selected='true'] &`]: {
			color: colors.grayscale[0],
		},
	},
});

export const checkboxBox = style({
	flexShrink: 0,
	width: "14px",
	height: "14px",
	borderRadius: "3px",
	border: `1.2px solid ${colors.grayscale[200]}`,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: colors.grayscale[0],
	transition: "all 0.15s ease",

	selectors: {
		"&[data-checked='true']": {
			backgroundColor: colors.brand.iris[500],
			borderColor: colors.brand.iris[500],
		},
	},
});

export const emptyResult = style({
	padding: "20px 16px",
	textAlign: "center",
	...themeVars.fonts.caption2_2,
	color: colors.grayscale[300],
});
