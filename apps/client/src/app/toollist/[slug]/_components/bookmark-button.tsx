"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { postToolScrapAction } from "@/common/api/actions/tool.actions";
import { toast } from "@/common/components/toast";
import { useIsLoggedIn } from "@/common/context/auth-context";
import * as styles from "./styles/tool-meta-bar.css";

type Props = {
	toolId: number;
	initialScrapped: boolean;
};

export const BookmarkButton = ({ toolId, initialScrapped }: Props) => {
	const isLoggedIn = useIsLoggedIn();
	const router = useRouter();
	const [isScrapped, setIsScrapped] = useState(initialScrapped);
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		if (!isLoggedIn) {
			router.push("/login");
			return;
		}

		const next = !isScrapped;
		setIsScrapped(next);

		startTransition(async () => {
			const result = await postToolScrapAction(toolId);

			if (!result.success) {
				setIsScrapped(!next);
				toast(result.error || "저장에 실패했어요. 다시 시도해 주세요.");
				return;
			}

			setIsScrapped(result.data.isScrapped);
			toast(result.data.isScrapped ? "북마크에 저장했어요." : "북마크를 해제했어요.");
		});
	};

	return (
		<button
			type="button"
			className={styles.iconButton}
			onClick={handleClick}
			disabled={isPending}
			aria-label="북마크"
			aria-pressed={isScrapped}
		>
			{isScrapped ? (
				<Image src="/icons/tool/ic_bookmark_iris500_20.svg" alt="" width={16} height={20} />
			) : (
				<span className={styles.iconSwap}>
					<Image
						src="/icons/tool/ic_bookmark_iris300_20.svg"
						alt=""
						width={16}
						height={20}
						className={styles.iconDefault}
					/>
					<Image
						src="/icons/tool/ic_bookmark_iris400_20.svg"
						alt=""
						width={16}
						height={20}
						className={styles.iconHovered}
					/>
				</span>
			)}
		</button>
	);
};
