import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "src/foundations/theme.css";

export const rootStyle = style({
	position: "relative",
	width: "100%",
	boxSizing: "border-box",
});

export const dropdownTriggerRecipe = recipe({
	base: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		height: "44px",
		padding: "12px 12px 12px 20px",
		backgroundColor: themeVars.colors.grayscale[0],
		border: `1px solid ${themeVars.colors.grayscale[50]}`,
		borderRadius: "14px",
		textAlign: "left",
		cursor: "pointer",
		color: themeVars.colors.grayscale[500],
		...themeVars.fonts.caption1_1,
		boxSizing: "border-box",
	},

	variants: {
		open: {
			true: {
				borderBottomLeftRadius: 0,
				borderBottomRightRadius: 0,
			},
		},
		disabled: {
			true: {
				cursor: "not-allowed",
			},
		},
		hasValue: {
			true: {
				color: themeVars.colors.grayscale[900],
			},
			false: {
				color: themeVars.colors.grayscale[500],
			},
		},
		maxHeight: {
			150: {
				maxHeight: "150px",
			},
		},
	},
});

export const optionsListStyle = style({
	position: "absolute",
	top: "44px",
	left: 0,
	width: "inherit",
	margin: 0,
	padding: 0,
	backgroundColor: themeVars.colors.grayscale[0],
	border: `1px solid ${themeVars.colors.grayscale[50]}`,
	borderTop: "none",
	borderRadius: "0 0 14px 14px",
	overflowY: "auto",
	zIndex: 10,
	boxSizing: "border-box",
});

export const optionItemRecipe = recipe({
	base: {
		padding: "12px 12px 12px 20px",
		cursor: "pointer",
		transition: "background-color 0.2s",
		backgroundColor: themeVars.colors.grayscale[0],
		borderBottom: `1px solid ${themeVars.colors.grayscale[50]}`,
		...themeVars.fonts.caption1_1,
		color: themeVars.colors.grayscale[500],
		listStyle: "none",

		selectors: {
			":hover": {
				backgroundColor: themeVars.colors.grayscale[50],
			},
			"& button": {
				background: "none",
				border: "none",
				color: "inherit",
				font: "inherit",
			},
		},
	},
	variants: {
		selected: {
			true: {
				color: themeVars.colors.grayscale[900],
				backgroundColor: themeVars.colors.grayscale[50],
				fontWeight: 600,
			},
		},
	},
});

export const arrowIconStyle = style({
	transition: "transform 0.2s ease-in-out",
	selectors: {
		'[data-state="open"] &': {
			transform: "rotate(180deg)",
		},
	},
});
