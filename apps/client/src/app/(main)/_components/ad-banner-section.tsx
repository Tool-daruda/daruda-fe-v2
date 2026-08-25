"use client";

import { cx } from "@repo/ui";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { AdBanner } from "../_types/ad-banner";
import * as s from "./ad-banner-section.css";

type Props = {
	banners: AdBanner[];
};

export const AdBannerSection = ({ banners }: Props) => {
	const [current, setCurrent] = useState(0);

	if (banners.length === 0) return null;

	const total = banners.length;
	const move = (step: number) => setCurrent((prev) => (prev + step + total) % total);

	return (
		<section className={s.section} aria-label="광고 배너" aria-roledescription="carousel">
			<div className={s.viewport}>
				<ul className={s.track} style={{ transform: `translateX(-${current * 100}%)` }}>
					{banners.map((banner, index) => (
						<li key={banner.id} className={s.slide} aria-hidden={index !== current}>
							<Link
								href={banner.href}
								className={s.slideLink}
								tabIndex={index === current ? undefined : -1}
							>
								{banner.imageUrl ? (
									<Image
										src={banner.imageUrl}
										alt={banner.title}
										fill
										className={s.slideImage}
										sizes="1006px"
									/>
								) : (
									<span className={s.slideText}>
										<strong className={s.slideTitle}>{banner.title}</strong>
										<span className={s.slideDescription}>{banner.description}</span>
									</span>
								)}
							</Link>
						</li>
					))}
				</ul>
			</div>

			{total > 1 && (
				<>
					<button
						type="button"
						className={cx(s.arrow, s.arrowPrev)}
						onClick={() => move(-1)}
						aria-label="이전 광고 보기"
					>
						<Image src="/icons/ic_arrow_right_white_16.svg" alt="" width={12} height={16} />
					</button>
					<button
						type="button"
						className={cx(s.arrow, s.arrowNext)}
						onClick={() => move(1)}
						aria-label="다음 광고 보기"
					>
						<Image src="/icons/ic_arrow_right_white_16.svg" alt="" width={12} height={16} />
					</button>

					<div className={s.dots} aria-hidden="true">
						{banners.map((banner, index) => (
							<span key={banner.id} className={cx(s.dot, index === current && s.dotActive)} />
						))}
					</div>
				</>
			)}
		</section>
	);
};
