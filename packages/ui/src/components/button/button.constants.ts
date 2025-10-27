import { themeVars } from "src/foundations";

export const buttonColors = {
	primary: {
		filled: {
			backgroundColor: themeVars.colors.brand.iris[500],
			color: themeVars.colors.brand.iris[50],
		},
		outlined: {
			backgroundColor: themeVars.colors.grayscale[5],
			color: themeVars.colors.brand.iris[500],
		},
	},
	dangerous: {
		filled: {
			backgroundColor: themeVars.colors.system.red.lt,
			color: themeVars.colors.grayscale[5],
		},
		outlined: {
			backgroundColor: themeVars.colors.grayscale[5],
			color: themeVars.colors.system.red.lt,
		},
	},
	tonal: {
		filled: {
			backgroundColor: themeVars.colors.grayscale[50],
			color: themeVars.colors.grayscale[700],
		},
	},
};

export const buttonSizes = {
	lg: {
		width: "130px",
		height: "54px",
		fonts: themeVars.fonts.t3_1,
	},
	sm: { fonts: themeVars.fonts.t4_1 },
};
