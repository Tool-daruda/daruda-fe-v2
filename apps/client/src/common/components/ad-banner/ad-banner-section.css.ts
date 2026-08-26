import { colors, themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const section = style({
	position: "relative",
	height: "126px",
	borderRadius: "16px",
	border: `1px solid ${colors.grayscale[50]}`,
	boxSizing: "border-box",
	overflow: "hidden",
});

export const viewport = style({
	position: "absolute",
	inset: 0,
	overflow: "hidden",
});

export const track = style({
	display: "flex",
	height: "100%",
	listStyle: "none",
	transition: "transform 0.4s ease",
});

/** 복제 슬라이드에서 실제 슬라이드로 되돌릴 때, 그 이동만 애니메이션 없이 처리한다 */
export const trackStatic = style({
	transition: "none",
});

export const slide = style({
	flex: "0 0 100%",
	minWidth: 0,
	height: "100%",
});

export const slideLink = style({
	position: "relative",
	display: "flex",
	alignItems: "center",
	height: "100%",
	padding: "0 64px",
	overflow: "hidden",
	backgroundColor: colors.brand.iris[100],
});

export const slideImage = style({
	objectFit: "cover",
});

export const slideText = style({
	display: "flex",
	flexDirection: "column",
	gap: "4px",
});

export const slideTitle = style({
	...themeVars.fonts.t2_1,
	color: colors.brand.iris[700],
});

export const slideDescription = style({
	...themeVars.fonts.b4_1,
	color: colors.brand.iris[500],
});

export const arrow = style({
	position: "absolute",
	top: "50%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "32px",
	height: "32px",
	borderRadius: "16px",
	backgroundColor: "rgba(22, 22, 22, 0.4)",
});

export const arrowPrev = style({
	left: "16px",
	transform: "translateY(-50%) rotate(180deg)",
});

export const arrowNext = style({
	right: "16px",
	transform: "translateY(-50%)",
});

export const dots = style({
	position: "absolute",
	bottom: "12px",
	left: "50%",
	transform: "translateX(-50%)",
	display: "flex",
	alignItems: "center",
	gap: "4px",
});

export const dot = style({
	width: "6px",
	height: "6px",
	borderRadius: "2000px",
	backgroundColor: "rgba(255, 255, 255, 0.4)",
	transition: "width 0.4s ease, background-color 0.4s ease",
});

export const dotActive = style({
	width: "10px",
	backgroundColor: colors.grayscale[0],
});
