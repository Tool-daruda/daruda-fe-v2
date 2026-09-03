"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { postToolScrapAction } from "@/common/api/actions/tool.actions";
import { toast } from "@/common/components/toast";
import { useIsLoggedIn } from "@/common/context/auth-context";
import { useScrappedTools } from "@/common/context/scrap-context";
import { useActionError } from "@/common/hooks/use-action-error";
import BookmarkIcon from "../icons/bookmark";
import * as styles from "./tool-card.css";

export const ToolBookmarkButton = ({ toolId }: { toolId?: number }) => {
	const { ids, setScrapped } = useScrappedTools();
	const isLoggedIn = useIsLoggedIn();
	const router = useRouter();
	const handleActionError = useActionError();
	const [isPending, startTransition] = useTransition();

	const isScrapped = toolId !== undefined && ids.has(toolId);

	const handleClick = (e: React.MouseEvent) => {
		// 카드 전체가 링크라 클릭이 상세로 새어나가지 않게 막습니다.
		e.preventDefault();
		e.stopPropagation();

		if (!isLoggedIn) {
			router.push("/login");
			return;
		}

		if (toolId === undefined) return;

		const next = !isScrapped;
		setScrapped(toolId, next);

		startTransition(async () => {
			const result = await postToolScrapAction(toolId);

			if (!result.success) {
				setScrapped(toolId, !next);
				handleActionError(result, "찜하기에 실패했어요. 다시 시도해 주세요.");
				return;
			}

			setScrapped(toolId, result.data.isScrapped);
			toast(result.data.isScrapped ? "툴을 찜했어요." : "찜을 취소했어요.");
		});
	};

	return (
		<button
			type="button"
			className={styles.bookmarkButton}
			onClick={handleClick}
			disabled={isPending}
			aria-pressed={isScrapped}
		>
			<BookmarkIcon isBookmarked={isScrapped} />
		</button>
	);
};
