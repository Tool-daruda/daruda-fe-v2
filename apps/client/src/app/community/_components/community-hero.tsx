import Image from "next/image";
import * as s from "./styles/community-hero.css";

interface CommunityHeroProps {
	defaultKeyword?: string;
}

export const CommunityHero = ({ defaultKeyword }: CommunityHeroProps) => {
	return (
		<header className={s.container}>
			<Image
				src="/icons/community/img_bg_darudalogo_278.svg"
				alt=""
				width={260}
				height={278}
				className={s.decorativeImage}
				priority
			/>

			<div className={s.textGroup}>
				<p className={s.subTitle}>자유로운 툴 정보 공유 공간</p>
				<h1 className={s.title}>daruda 커뮤니티</h1>
			</div>

			<form action="/community" method="GET" className={s.inputWrapper}>
				<input
					type="text"
					name="keyword"
					placeholder="툴과 관련된 정보를 찾아드려요"
					defaultValue={defaultKeyword}
					className={s.input}
				/>
				<button type="submit" className={s.searchButton} aria-label="검색">
					<Image src="/icons/ic_search_iris300_20.svg" alt="" width={20} height={20} />
				</button>
			</form>
		</header>
	);
};
