import { createGlobalTheme } from "@vanilla-extract/css";
import { colorTokens } from "./tokens";

export const colors = createGlobalTheme(":root", colorTokens);

export type Colors = typeof colors;
