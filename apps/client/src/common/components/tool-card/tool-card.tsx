"use client";

import { cx } from "@repo/ui";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { postToolScrapAction } from "@/common/api/actions/tool.actions";
import { toast } from "@/common/components/toast";
import { PRICE_LABEL, type PriceType } from "@/common/constants/price";
import { useIsLoggedIn } from "@/common/context/auth-context";
import BookmarkIcon from "../icons/bookmark";
import * as styles from "./tool-card.css";

type ToolCardVariant = "horizontal" | "vertical";
type BadgeType = "hot" | "new";

type Props = {
	toolId?: number;
	title: string;
	description?: string;
	thumbnailUrl?: string;
	tags?: string[];
	priceType?: PriceType;
	isBookmarked?: boolean;
	badgeType?: BadgeType;
	variant?: ToolCardVariant;
	href?: string;
};

export default function ToolCard({
	toolId,
	title,
	description,
	thumbnailUrl,
	tags = [],
	priceType,
	isBookmarked = false,
	badgeType,
	variant = "horizontal",
	href,
}: Props) {
	const isVertical = variant === "vertical";
	const isLoggedIn = useIsLoggedIn();
	const router = useRouter();
	const [isScrapped, setIsScrapped] = useState(isBookmarked);
	const [syncedBookmark, setSyncedBookmark] = useState(isBookmarked);
	const [isPending, startTransition] = useTransition();

	// 찜 이후 재검증으로 서버 값이 새로 내려오면 카드 상태를 서버 기준으로 맞춥니다.
	if (syncedBookmark !== isBookmarked) {
		setSyncedBookmark(isBookmarked);
		setIsScrapped(isBookmarked);
	}

	const handleBookmarkClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (!isLoggedIn) {
			router.push("/login");
			return;
		}

		const next = !isScrapped;
		setIsScrapped(next);

		if (toolId === undefined) return;

		startTransition(async () => {
			const result = await postToolScrapAction(toolId);

			if (!result.success) {
				setIsScrapped(!next);
				toast(result.error || "찜하기에 실패했어요. 다시 시도해 주세요.");
				return;
			}

			setIsScrapped(result.data.scrap);
			toast(result.data.scrap ? "툴을 찜했어요." : "찜을 취소했어요.");
		});
	};

	const contentInner = (
		<>
			<button
				type="button"
				className={styles.bookmarkButton}
				onClick={handleBookmarkClick}
				disabled={isPending}
				aria-pressed={isScrapped}
			>
				<BookmarkIcon isBookmarked={isScrapped} />
			</button>

			<div className={cx(styles.body, styles.bodyVariant[variant])}>
				<div className={styles.thumbnailSection}>
					{badgeType === "hot" && (
						<div className={styles.hotBadge}>
							<Image src="/icons/ic_hot_24_red.svg" alt="Hot" width={24} height={24} />
						</div>
					)}
					{badgeType === "new" && <div className={styles.newBadge}>New</div>}

					<div className={cx(styles.thumbnail, styles.thumbnailVariant[variant])}>
						{thumbnailUrl && (
							<Image src={thumbnailUrl} alt={title} fill className={styles.thumbnailImage} />
						)}
					</div>
				</div>

				<div className={cx(styles.textBlock, styles.textBlockVariant[variant])}>
					<h3 className={cx(styles.title, styles.titleVariant[variant])}>{title}</h3>
					{!isVertical && description && <p className={styles.description}>{description}</p>}
				</div>
			</div>

			<div className={styles.tagList}>
				{[...new Set(tags)].slice(0, 2).map((tag) => (
					<span key={tag} className={styles.tag}>
						{tag}
					</span>
				))}
				{priceType && (
					<span className={cx(styles.priceTag, styles.priceTone[priceType])}>
						{PRICE_LABEL[priceType]}
					</span>
				)}
			</div>
		</>
	);

	const className = cx(styles.card, styles.variant[variant]);

	if (href) {
		return (
			<Link href={href} className={className}>
				{contentInner}
			</Link>
		);
	}

	return <div className={className}>{contentInner}</div>;
}
