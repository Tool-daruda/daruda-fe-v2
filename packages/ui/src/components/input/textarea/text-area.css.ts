import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "src/foundations";

export const textAreaRecipe = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		gap: "12px",
		border: `1px solid`,
		color: themeVars.colors.grayscale[500],
		backgroundColor: themeVars.colors.grayscale[0],
		width: "424px",
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
				height: "124px",
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
	},

	defaultVariants: {
		size: "xl",
		active: false,
		disabled: false,
	},
});

export const inputStyle = style({
	width: "100%",
	height: "100%",
	resize: "none",
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
