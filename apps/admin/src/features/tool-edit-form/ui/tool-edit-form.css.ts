import { themeVars } from "@repo/ui";
import { style } from "@vanilla-extract/css";

export const sectionStyle = style({
	width: "100%",
	display: "flex",
	flexDirection: "column",
	gap: "6rem",
	marginTop: "3rem",
	marginBottom: "5.6rem",
});

export const buttonGroupStyle = style({
	width: "100%",
	display: "flex",
	justifyContent: "center",
	gap: "1.6rem",
	marginBottom: "30.4rem",
});

export const sectionPStyle = style({
	...themeVars.fonts.t4_1,
	color: themeVars.colors.grayscale[400],
});

export const sectionGroupStyle = style({
	display: "flex",
	flexDirection: "column",
	gap: "2.4rem",
	marginBottom: "0.4rem",
});

export const sectionTitleGroupStyle = style({
	display: "flex",
	alignItems: "center",
	gap: "3.2rem",
});

export const hrStyle = style({
	width: "75.6rem",
	height: "0.2rem",
	background: themeVars.colors.grayscale[50],
});

export const loadingStyle = style({
	padding: "0.8rem 1.2rem",
	color: themeVars.colors.grayscale[400],
});

// 검색 결과 리스트
export const searchResultsListStyle = style({
	display: "flex",
	flexDirection: "column",
	gap: "1.2rem",
	maxHeight: "15rem",
	padding: "1rem",
	margin: "0.8rem 0 0 0",
	border: `1px solid ${themeVars.colors.grayscale[50]}`,
	borderRadius: "12px",
	overflowY: "auto",
	backgroundColor: themeVars.colors.grayscale[0],
	...themeVars.fonts.t4_1,
	color: themeVars.colors.grayscale[400],
	listStyle: "none",
});

// 선택된 툴 리스트
export const selectedToolsUlStyle = style({
	listStyle: "none",
	padding: 0,
	margin: 0,
	display: "flex",
	flexWrap: "wrap",
	gap: "2.8rem",
});

export const selectedToolsLiStyle = style({
	borderRadius: "14px",
	border: `1px solid ${themeVars.colors.grayscale[50]}`,
	background: themeVars.colors.grayscale[0],
	display: "flex",
	alignItems: "center",
	padding: "1.2rem 1.2rem 1.2rem 2rem",
	gap: "1.2rem",
	color: themeVars.colors.grayscale[900],
	...themeVars.fonts.caption1_1,
});

export const selectedToolsBtnStyle = style({
	border: "none",
	fill: "none",
});

export const errorStyle = style({
	color: themeVars.colors.system.red.lt,
	fontSize: "1.4rem",
	marginTop: "0.8rem",
});

// 임시저장
export const notiStyle = style({
	display: "flex",
	flexDirection: "column",
	gap: "0.8rem",

	width: "100%",
	margin: "0.4rem 0",
	padding: "1.2rem",

	borderRadius: "12px",
	background: themeVars.colors.brand.orange[100],
	...themeVars.fonts.h5_1,
});

export const buttonContainer = style({
	display: "flex",
	justifyContent: "end",
	gap: "0.8rem",
});
