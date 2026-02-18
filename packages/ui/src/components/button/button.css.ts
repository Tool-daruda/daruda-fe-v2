import { style } from "@vanilla-extract/css";
import { buttonColors, buttonSizes } from "./button.constants";

export const buttonBaseStyle = style({
	padding: "8px 14px",
	borderRadius: "12px",
	cursor: "pointer",
	border: "1px solid transparent",
	boxSizing: "border-box",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	whiteSpace: "nowrap",
});

export const buttonSizeStyles = {
	lg: style({
		width: buttonSizes.lg.width,
		height: buttonSizes.lg.height,
		...buttonSizes.lg.fonts,
	}),
	sm: style({
		...buttonSizes.sm.fonts,
	}),
	icon: style({
		width: "44px",
		height: "44px",
		padding: "0",
	}),
} as const;

export const buttonRoundedStyles = {
	rounded: style({}),
	pill: style({
		borderRadius: "9999px",
	}),
} as const;

export const buttonVariantStyles = {
	primaryFilled: style({
		backgroundColor: buttonColors.primary.filled.backgroundColor,
		color: buttonColors.primary.filled.color,
	}),
	primaryOutlined: style({
		backgroundColor: buttonColors.primary.outlined.backgroundColor,
		color: buttonColors.primary.outlined.color,
		borderColor: buttonColors.primary.outlined.color,
	}),
	dangerousFilled: style({
		backgroundColor: buttonColors.dangerous.filled.backgroundColor,
		color: buttonColors.dangerous.filled.color,
	}),
	dangerousOutlined: style({
		backgroundColor: buttonColors.dangerous.outlined.backgroundColor,
		color: buttonColors.dangerous.outlined.color,
		borderColor: buttonColors.dangerous.outlined.color,
	}),
	tonal: style({
		backgroundColor: buttonColors.tonal.filled.backgroundColor,
		color: buttonColors.tonal.filled.color,
	}),
} as const;
