import { colors } from "@repo/ui";

interface BookmarkIconProps {
	isBookmarked?: boolean;
	className?: string;
}

export default function BookmarkIcon({ isBookmarked = false, className }: BookmarkIconProps) {
	const fill = isBookmarked ? colors.brand.iris[400] : "none";
	const stroke = isBookmarked ? colors.brand.iris[400] : colors.grayscale[100];
	const strokeWidth = isBookmarked ? "1" : "1.2";

	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: 'Bookmark icon is decorative and does not require a title.'
		<svg
			width="28"
			height="28"
			viewBox="0 0 28 28"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M7 5.875C7 5.39175 7.39175 5 7.875 5H21.125C21.6082 5 22 5.39175 22 5.875V21.4839C22 22.1576 21.2706 22.5786 20.6873 22.2415L14.9377 18.9196C14.6669 18.7631 14.3331 18.7631 14.0623 18.9196L8.31274 22.2415C7.72941 22.5786 7 22.1576 7 21.4839V5.875Z"
				fill={fill}
				stroke={stroke}
				strokeWidth={strokeWidth}
				style={{ transition: "all 0.2s ease-in-out" }}
			/>
		</svg>
	);
}
