"use client";

import { colors } from "@repo/ui/foundations";
import { useState } from "react";
import * as s from "./styles/post-bookmark-button.css";

interface PostBookmarkButtonProps {
	initialCount: number;
	initialScrapped: boolean;
}

// TODO(api): 클릭 시 ToolApi/BoardApi 스크랩 토글 엔드포인트로 교체됩니다. 현재는 로컬 상태만 변경합니다.
export const PostBookmarkButton = ({ initialCount, initialScrapped }: PostBookmarkButtonProps) => {
	const [isScrapped, setIsScrapped] = useState(initialScrapped);
	const [count, setCount] = useState(initialCount);

	const handleClick = () => {
		setIsScrapped((prev) => !prev);
		setCount((prev) => (isScrapped ? prev - 1 : prev + 1));
	};

	return (
		<button type="button" className={s.button} onClick={handleClick} aria-pressed={isScrapped}>
			<BookmarkGlyph filled={isScrapped} />
			<span className={s.count}>{count}</span>
		</button>
	);
};

const BookmarkGlyph = ({ filled }: { filled: boolean }) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: 'Bookmark icon is decorative and does not require a title.'
	<svg
		width="28"
		height="28"
		viewBox="0 0 19.0085 23.0261"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M0.888889 2.03174C0.888889 1.40056 1.40056 0.888889 2.03175 0.888889H16.9768C17.608 0.888889 18.1197 1.40056 18.1197 2.03175V20.9911C18.1197 21.8866 17.1366 22.4342 16.3753 21.9629L10.1058 18.0818C9.73724 17.8536 9.2713 17.8536 8.90272 18.0818L2.63329 21.9629C1.87193 22.4342 0.888889 21.8866 0.888889 20.9911V2.03174Z"
			fill={filled ? colors.brand.iris[500] : "none"}
			stroke={colors.brand.iris[500]}
			strokeWidth="1.77778"
		/>
	</svg>
);
