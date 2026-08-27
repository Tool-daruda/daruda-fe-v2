"use client";

import { cx } from "@repo/ui";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { postToolLikeAction } from "@/common/api/actions/tool.actions";
import { toast } from "@/common/components/toast";
import { useIsLoggedIn } from "@/common/context/auth-context";
import { useActionError } from "@/common/hooks/use-action-error";
import * as styles from "./styles/tool-like-button.css";

type Props = {
	toolId: number;
	initialLiked: boolean;
	initialLikeCount: number;
};

export const ToolLikeButton = ({ toolId, initialLiked, initialLikeCount }: Props) => {
	const isLoggedIn = useIsLoggedIn();
	const router = useRouter();
	const handleActionError = useActionError();
	// 재검증 리프레시로 prop이 갱신돼도 상태를 되돌리지 않습니다.
	// 서버 응답으로 이미 확정한 값이라, prop을 다시 반영하면 값이 튀며 깜빡입니다.
	const [isLiked, setIsLiked] = useState(initialLiked);
	const [likeCount, setLikeCount] = useState(initialLikeCount);
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		if (!isLoggedIn) {
			router.push("/login");
			return;
		}

		const next = !isLiked;
		setIsLiked(next);
		setLikeCount((prev) => (next ? prev + 1 : Math.max(prev - 1, 0)));

		startTransition(async () => {
			const result = await postToolLikeAction(toolId);

			if (!result.success) {
				setIsLiked(!next);
				setLikeCount((prev) => (next ? Math.max(prev - 1, 0) : prev + 1));
				handleActionError(result, "좋아요에 실패했어요. 다시 시도해 주세요.");
				return;
			}

			setIsLiked(result.data.liked);
			setLikeCount(result.data.likeCount);
			toast(result.data.liked ? "도움이 되었어요를 눌렀어요." : "도움이 되었어요를 취소했어요.");
		});
	};

	return (
		<button
			type="button"
			className={cx(styles.button, isLiked && styles.buttonLiked)}
			onClick={handleClick}
			disabled={isPending}
			aria-pressed={isLiked}
		>
			<div className={styles.buttonContent}>
				<HeartGlyph />
				<span>도움이 되었어요</span>
			</div>
			<span className={styles.count}>{likeCount}</span>
		</button>
	);
};

const HeartGlyph = () => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: 'Heart icon is decorative and does not require a title.'
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M14.25 3C11.45 3 9.875 5.33363 9.875 6.5C9.875 5.33363 8.3 3 5.5 3C2.7 3 2 5.33363 2 6.5C2 12.625 9.875 17 9.875 17C9.875 17 17.75 12.625 17.75 6.5C17.75 5.33363 17.05 3 14.25 3Z"
			fill="currentColor"
			stroke="currentColor"
			strokeWidth="1.75"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
