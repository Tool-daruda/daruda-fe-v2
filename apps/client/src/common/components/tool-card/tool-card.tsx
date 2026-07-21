"use client";

import { cx } from "@repo/ui";
import Image from "next/image";
import Link from "next/link";
import { PRICE_LABEL, type PriceType } from "@/common/constants/price";
import BookmarkIcon from "../icons/bookmark";
import * as styles from "./tool-card.css";

type ToolCardVariant = "horizontal" | "vertical";
type BadgeType = "hot" | "new";

type Props = {
	title: string;
	description?: string;
	thumbnailUrl?: string;
	tags?: string[];
	priceType?: PriceType;
	isBookmarked?: boolean;
	badgeType?: BadgeType;
	variant?: ToolCardVariant;
	href?: string;
	onBookmarkClick?: () => void;
};

export default function ToolCard({
	title,
	description,
	thumbnailUrl,
	tags = [],
	priceType,
	isBookmarked = false,
	badgeType,
	variant = "horizontal",
	href,
	onBookmarkClick,
}: Props) {
	const isVertical = variant === "vertical";

	const contentInner = (
		<>
			<button
				type="button"
				className={styles.bookmarkButton}
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					onBookmarkClick?.();
				}}
			>
				<BookmarkIcon isBookmarked={isBookmarked} />
			</button>

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

			<div className={styles.content}>
				<div className={styles.topRow}>
					<div className={cx(styles.textBlock, styles.textBlockVariant[variant])}>
						<h3 className={cx(styles.title, styles.titleVariant[variant])}>{title}</h3>
						{!isVertical && description && <p className={styles.description}>{description}</p>}
					</div>
				</div>

				<div className={styles.bottomRow}>
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
				</div>
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
