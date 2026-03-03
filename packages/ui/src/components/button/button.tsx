import { buttonRecipe } from "./button.css";
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
	const buttonClassName = buttonRecipe({
		size,
		intent,
		appearance,
		rounded,
	});

	return (
		<button
			{...props}
			className={`${buttonClassName}${className || ""}`}
			disabled={loading || props.disabled}
		>
			{/* todo: 스피너 생기면 스피너로 변경 */}
			{loading ? "로딩중..." : children}
		</button>
	);
};
