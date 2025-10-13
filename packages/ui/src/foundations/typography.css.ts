import { styleVariants } from "@vanilla-extract/css";
import { typographyTokens } from "./tokens";

export const fonts = styleVariants(typographyTokens);
export const fontsStyles = typographyTokens;
