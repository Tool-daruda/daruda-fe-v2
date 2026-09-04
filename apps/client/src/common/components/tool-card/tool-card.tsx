"use client";

// 카드 자체에는 상호작용이 없지만, @repo/ui 번들이 클라이언트 전용이라 서버 컴포넌트로 둘 수 없습니다.

import { cx } from "@repo/ui";
import Image from "next/image";
import Link from "next/link";
import { PRICE_LABEL, type PriceType } from "@/common/constants/price";
import { ToolBookmarkButton } from "./tool-bookmark-button";
import * as styles from "./tool-card.css";

type ToolCardVariant = "horizontal" | "vertical" | "alternative";
type BadgeType = "hot" | "new";

type Props = {
	toolId?: number;
	title: string;
	description?: string;
	thumbnailUrl?: string;
	tags?: string[];
	priceType?: PriceType;
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
	badgeType,
	variant = "horizontal",
	href,
}: Props) {
	// 대안툴 카드는 사이드바용 축약형이라 찜 버튼과 한 줄 소개가 없다.
	const isAlternative = variant === "alternative";

	const contentInner = (
		<>
			{!isAlternative && <ToolBookmarkButton toolId={toolId} />}

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
					{variant === "horizontal" && description && (
						<p className={styles.description}>{description}</p>
					)}
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
