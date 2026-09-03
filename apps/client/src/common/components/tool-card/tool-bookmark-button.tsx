"use client";

import { useRouter } from "next/navigation";
import { Suspense, useState, useTransition } from "react";
import { postToolScrapAction } from "@/common/api/actions/tool.actions";
import { toast } from "@/common/components/toast";
import { useIsLoggedIn } from "@/common/context/auth-context";
import { useIsScrapped } from "@/common/context/scrap-context";
import { useActionError } from "@/common/hooks/use-action-error";
import BookmarkIcon from "../icons/bookmark";
import * as styles from "./tool-card.css";

/** 찜 여부가 도착하기 전에 보여줄 중립 상태입니다. */
const BookmarkPlaceholder = () => (
	<button type="button" className={styles.bookmarkButton} disabled aria-hidden>
		<BookmarkIcon />
	</button>
);

const BookmarkToggle = ({ toolId }: { toolId?: number }) => {
	// 서스펜드할 수 있으므로 다른 훅보다 먼저 호출합니다.
	const initialScrapped = useIsScrapped(toolId);

	const isLoggedIn = useIsLoggedIn();
	const router = useRouter();
	const handleActionError = useActionError();
	const [isScrapped, setIsScrapped] = useState(initialScrapped);
	const [isPending, startTransition] = useTransition();

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
		setIsScrapped(next);

		startTransition(async () => {
			const result = await postToolScrapAction(toolId);

			if (!result.success) {
				setIsScrapped(!next);
				handleActionError(result, "찜하기에 실패했어요. 다시 시도해 주세요.");
				return;
			}

			setIsScrapped(result.data.isScrapped);
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

export const ToolBookmarkButton = ({ toolId }: { toolId?: number }) => (
	<Suspense fallback={<BookmarkPlaceholder />}>
		<BookmarkToggle toolId={toolId} />
	</Suspense>
);
