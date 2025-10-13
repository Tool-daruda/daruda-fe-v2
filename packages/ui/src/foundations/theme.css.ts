import { createTheme } from "@vanilla-extract/css";
import { colorTokens, typographyTokens } from "./tokens";

export const [themeClass, themeVars] = createTheme({
	colors: colorTokens,
	fonts: typographyTokens,
});

export type ThemeVars = typeof themeVars;
export type ThemeClass = typeof themeClass;
