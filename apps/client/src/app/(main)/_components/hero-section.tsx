import Image from "next/image";
import Link from "next/link";
import { ToolApi } from "@/common/api/tool-api";
import * as s from "./hero-section.css";

export const HeroSection = async () => {
	const categories = (await ToolApi.getCategories().catch(() => null)) || [];

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

					<div className={s.categorySection}>
						<nav className={s.categoryList}>
							{categories.map((category) => (
								<Link
									key={category.name}
									href={
										category.name === "ALL" ? "/toollist" : `/toollist?category=${category.name}`
									}
									className={category.name === "ALL" ? s.categoryChipActive : s.categoryChip}
								>
									{category.koreanName}
								</Link>
							))}
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
};
