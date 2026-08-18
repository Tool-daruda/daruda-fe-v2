import { colors } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const backdrop = style({
	position: "fixed",
	inset: 0,
	zIndex: 100,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: "rgba(22, 22, 22, 0.4)",
	padding: "20px",
});

export const overlayButton = style({
	position: "absolute",
	inset: 0,
	background: "none",
	border: "none",
	padding: 0,
	cursor: "default",
});

export const figure = style({
	position: "relative",
	width: "100%",
	// 닫기 버튼이 이미지 위쪽에 겹치지 않도록 자리를 비워둡니다.
	paddingTop: "46px",
});

export const imageWrapper = style({
	position: "relative",
	width: "100%",
	borderRadius: "8px",
	backgroundColor: colors.grayscale[400],
	overflow: "hidden",
});

export const image = style({
	objectFit: "cover",
});

export const closeButton = style({
	position: "absolute",
	top: 0,
	right: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "36px",
	height: "36px",
	background: "none",
	border: "none",
	padding: 0,
	cursor: "pointer",
});
