import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	padding: "0 24px",
	display: "flex",
	flexDirection: "column",
	gap: "20px",
});

export const title = style({
	...themeVars.fonts.t3_1,
	color: colors.grayscale[900],
});

export const grid = style({
	display: "grid",
	gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
	gap: "12px",

	"@media": {
		"screen and (max-width: 1024px)": {
			gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
		},
		"screen and (max-width: 768px)": {
			gridTemplateColumns: "1fr",
		},
	},
});

export const card = style({
	display: "flex",
	flexDirection: "column",
	gap: "12px",
	paddingBottom: "14px",
	borderRadius: "12px",
	border: `1px solid ${colors.grayscale[25]}`,
	background: colors.grayscale[0],
	overflow: "hidden",
	color: "inherit",
	textDecoration: "none",
});

export const thumbnail = style({
	position: "relative",
	flexShrink: 0,
	aspectRatio: "206 / 132",
	borderBottom: `1px solid ${colors.grayscale[50]}`,
	background: colors.grayscale[25],
});

// 흐름에 두면 세로로 긴 썸네일의 원본 높이가 flex 아이템의 min-height로 잡혀
// 카드가 통째로 늘어난다. 절대 배치해 레이아웃에서 빼고 비율 박스만 남긴다.
export const thumbnailImage = style({
	position: "absolute",
	inset: 0,
	width: "100%",
	height: "100%",
	objectFit: "cover",
});

export const content = style({
	display: "flex",
	flexDirection: "column",
	gap: "8px",
	padding: "0 16px",
});

export const textBlock = style({
	display: "flex",
	flexDirection: "column",
	gap: "4px",
	height: "60px",
	wordBreak: "break-word",
});

export const cardTitle = style({
	...themeVars.fonts.t4_1,
	color: colors.grayscale[900],
	display: "-webkit-box",
	WebkitBoxOrient: "vertical",
	WebkitLineClamp: 2,
	height: "40px",
	overflow: "hidden",
});

export const summary = style({
	...themeVars.fonts.caption2_1,
	color: colors.grayscale[300],
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

export const siteRow = style({
	display: "flex",
	alignItems: "center",
	gap: "4px",
});

export const favicon = style({
	flexShrink: 0,
	width: "14px",
	height: "14px",
	objectFit: "contain",
});

export const siteName = style({
	...themeVars.fonts.caption2_1,
	color: colors.grayscale[200],
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});
