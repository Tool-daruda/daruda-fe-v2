import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "src/foundations";

export const textFieldRecipe = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		gap: "12px",
		border: `1px solid`,
		color: themeVars.colors.grayscale[500],
		backgroundColor: themeVars.colors.grayscale[0],
		height: "44px",
		borderRadius: "14px",
		padding: `12px 12px 12px 20px`,
		...themeVars.fonts.caption1_1,
		boxSizing: "border-box",

		"::placeholder": {
			color: themeVars.colors.grayscale[500],
			...themeVars.fonts.caption1_1,
		},
	},

	variants: {
		size: {
			xl: {
				width: "424px",
			},
			s: {
				width: "194px",
			},
		},
		active: {
			true: {
				borderColor: themeVars.colors.grayscale[400],
			},
			false: {
				borderColor: themeVars.colors.grayscale[50],
			},
		},
		disabled: {
			true: {
				cursor: "not-allowed",
			},
		},
		isError: {
			true: {
				borderColor: themeVars.colors.system.red.lt,
			},
		},
	},

	defaultVariants: {
		size: "xl",
		active: false,
		disabled: false,
	},
});

export const inputStyle = style({
	width: "100%",
	border: "none",
	outline: "none",
	padding: 0,
	backgroundColor: "transparent",
	color: "inherit",
	font: "inherit",
	"::placeholder": {
		color: "inherit",
		font: "inherit",
	},
});

export const buttonStyle = style({
	all: "unset",
	cursor: "pointer",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});
