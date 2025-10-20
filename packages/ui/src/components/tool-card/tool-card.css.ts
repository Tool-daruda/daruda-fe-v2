import { style } from "@vanilla-extract/css";
import { themeVars } from "../../foundations";

const textClampSingleLine = {
	display: "-webkit-box",
	WebkitBoxOrient: "vertical" as const,
	WebkitLineClamp: 2,
	overflow: "hidden",
	textOverflow: "ellipsis",
	alignContent: "center",
};

const baseCardText = {
	...themeVars.fonts.b5_1,
};

export const card = style({
	width: "100%",
	display: "flex",
	padding: "10px 8px",
	alignItems: "center",
	gap: "44px",
	alignSelf: "stretch",
	borderBottom: `0.5px solid ${themeVars.colors.grayscale[50]}`,
	color: themeVars.colors.grayscale[800],
	background: themeVars.colors.grayscale[5],
	...themeVars.fonts.b5_1,
});

export const cardHead = style({
	display: "flex",
	alignItems: "center",
	gap: "16px",
});

export const cardLogo = style({
	width: "60px",
	height: "60px",
	borderRadius: "8px",
	objectFit: "cover",
});

export const cardName = style({
	...textClampSingleLine,
	width: "126px",
	height: "40px",
	...baseCardText,
});

export const cardDescription = style({
	...textClampSingleLine,
	width: "261px",
	height: "40px",
	...baseCardText,
});

export const cardCategory = style({
	width: "150px",
	...textClampSingleLine,
});

export const cardUpdatedAt = style({
	width: "150px",
	...textClampSingleLine,
});

export const editButton = style({
	display: "flex",
	padding: "8px 14px",
	justifyContent: "center",
	alignItems: "center",
	borderRadius: "12px",
	background: themeVars.colors.grayscale[50],
	color: themeVars.colors.grayscale[700],
	whiteSpace: "nowrap",
	...themeVars.fonts.t4_1,
	cursor: "pointer",
	border: "none",
});
