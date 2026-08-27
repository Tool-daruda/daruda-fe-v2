"use client";

import { cx } from "@repo/ui";
import Image from "next/image";
import Link from "next/link";
import { type TransitionEvent, useEffect, useState } from "react";
import * as s from "./ad-banner-section.css";

export type AdBanner = {
	id: number;
	href: string;
	title: string;
	description: string;
	/** 등록된 배너 이미지. 없으면 title/description만 표시한다 */
	imageUrl?: string;
};

type Props = {
	banners: AdBanner[];
};

/** 트랙 앞뒤에 복제 슬라이드를 하나씩 두므로 실제 첫 광고의 트랙 위치는 1이다 */
const FIRST_POSITION = 1;

export const AdBannerSection = ({ banners }: Props) => {
	const total = banners.length;
	const isLoop = total > 1;

	const [position, setPosition] = useState(FIRST_POSITION);
	const [isAnimated, setIsAnimated] = useState(true);

	// 복제 슬라이드로 넘어간 뒤 같은 그림의 실제 슬라이드로 되돌렸으면,
	// 그 이동이 그려진 다음 프레임에 애니메이션을 다시 켠다
	useEffect(() => {
		if (isAnimated) return;

		let innerFrame = 0;
		const outerFrame = requestAnimationFrame(() => {
			innerFrame = requestAnimationFrame(() => setIsAnimated(true));
		});

		return () => {
			cancelAnimationFrame(outerFrame);
			cancelAnimationFrame(innerFrame);
		};
	}, [isAnimated]);

	if (total === 0) return null;

	const slides = isLoop
		? [
				{ key: "clone-last", banner: banners[total - 1] },
				...banners.map((banner) => ({ key: String(banner.id), banner })),
				{ key: "clone-first", banner: banners[0] },
			]
		: banners.map((banner) => ({ key: String(banner.id), banner }));

	const trackPosition = isLoop ? position : 0;
	const current = (position - FIRST_POSITION + total) % total;
	const isOnClone = position === 0 || position === total + 1;

	const move = (step: number) => {
		// 되돌리는 중이거나 이미 복제 슬라이드에 있으면 트랙 밖으로 넘어간다
		if (!isAnimated || isOnClone) return;
		setPosition((prev) => prev + step);
	};

	const restorePosition = (event: TransitionEvent<HTMLUListElement>) => {
		if (event.target !== event.currentTarget) return;

		if (position === 0) {
			setIsAnimated(false);
			setPosition(total);
		} else if (position === total + 1) {
			setIsAnimated(false);
			setPosition(FIRST_POSITION);
		}
	};

	return (
		<section className={s.section} aria-label="광고 배너" aria-roledescription="carousel">
			<div className={s.viewport}>
				<ul
					className={cx(s.track, !isAnimated && s.trackStatic)}
					style={{ transform: `translateX(-${trackPosition * 100}%)` }}
					onTransitionEnd={restorePosition}
				>
					{slides.map((slide, index) => {
						const isCurrent = index === trackPosition;

						return (
							<li key={slide.key} className={s.slide} aria-hidden={!isCurrent}>
								<Link
									href={slide.banner.href}
									className={s.slideLink}
									tabIndex={isCurrent ? undefined : -1}
								>
									{slide.banner.imageUrl ? (
										<Image
											src={slide.banner.imageUrl}
											alt={slide.banner.title}
											fill
											className={s.slideImage}
											sizes="1006px"
										/>
									) : (
										<span className={s.slideText}>
											<strong className={s.slideTitle}>{slide.banner.title}</strong>
											<span className={s.slideDescription}>{slide.banner.description}</span>
										</span>
									)}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>

			{isLoop && (
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
