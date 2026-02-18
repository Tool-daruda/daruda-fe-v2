import {
	buttonBaseStyle,
	buttonRoundedStyles,
	buttonSizeStyles,
	buttonVariantStyles,
} from "./button.css";
import type { ButtonProps } from "./button.types";

export const Button = ({
	size,
	intent,
	appearance,
	rounded,
	loading,
	children,
	className,
	...props
}: ButtonProps) => {
	const resolvedSize = size ?? "lg";
	const resolvedIntent = intent ?? "primary";
	const resolvedAppearance = appearance ?? "filled";
	const resolvedRounded = rounded ?? "rounded";

	const sizeClass = buttonSizeStyles[resolvedSize];
	const roundedClass = buttonRoundedStyles[resolvedRounded];

	let variantClass = buttonVariantStyles.tonal;
	if (resolvedIntent === "primary") {
		variantClass =
			resolvedAppearance === "outlined"
				? buttonVariantStyles.primaryOutlined
				: buttonVariantStyles.primaryFilled;
	} else if (resolvedIntent === "dangerous") {
		variantClass =
			resolvedAppearance === "outlined"
				? buttonVariantStyles.dangerousOutlined
				: buttonVariantStyles.dangerousFilled;
	}

	return (
		<button
			{...props}
			className={`${buttonBaseStyle} ${sizeClass} ${roundedClass} ${variantClass}${
				className ? ` ${className}` : ""
			}`}
			disabled={loading || props.disabled}
		>
			{/* todo: 스피너 생기면 스피너로 변경 */}
			{loading ? "로딩중..." : children}
		</button>
	);
};
