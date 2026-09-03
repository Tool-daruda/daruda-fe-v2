import Image from "next/image";
import { Suspense } from "react";
import { HeroCategoryNav, HeroCategoryNavSkeleton } from "./hero-category-nav";
import * as s from "./hero-section.css";

// 제목·검색폼이 LCP라 히어로 자체는 동기 컴포넌트로 두고,
// 데이터가 필요한 카테고리 칩만 아래에서 스트리밍합니다.
export const HeroSection = () => {
	return (
		<header className={s.container}>
			<div className={s.inner}>
				<Image
					src="/icons/img_bg_darudalogo_278.svg"
					alt=""
					width={260}
					height={278}
					className={s.decorativeImage}
					priority
				/>

				<div className={s.contentGroup}>
					<div className={s.titleGroup}>
						<p className={s.subTitle}>학업, 과제, 팀플, 동아리, 대외활동 등</p>
						<h1 className={s.title}>대학 생활에 필요한 툴을 다루다</h1>
					</div>

					<form action="/search" method="GET" className={s.inputWrapper}>
						<input
							type="text"
							name="keyword"
							placeholder="툴과 관련된 정보를 찾아드려요"
							className={s.input}
							required
						/>
						<button type="submit" className={s.searchIcon} aria-label="검색">
							<Image src="/icons/ic_search_iris300_20.svg" alt="" width={20} height={20} />
						</button>
					</form>

					<Suspense fallback={<HeroCategoryNavSkeleton />}>
						<HeroCategoryNav />
					</Suspense>
				</div>
			</div>
		</header>
	);
};
