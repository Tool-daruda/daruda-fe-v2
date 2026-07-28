"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import * as s from "../styles/search-page.css";

interface SearchHeaderProps {
	initialKeyword: string;
	activeTab: string;
}

export function SearchHeader({ initialKeyword, activeTab }: SearchHeaderProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [keyword, setKeyword] = useState(initialKeyword);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams(searchParams.toString());
		if (keyword.trim()) {
			params.set("keyword", keyword.trim());
		} else {
			params.delete("keyword");
		}
		if (activeTab) {
			params.set("tab", activeTab);
		}
		router.push(`/search?${params.toString()}`);
	};

	return (
		<header className={s.heroContainer}>
			<Image
				src="/icons/community/img_bg_darudalogo_278.svg"
				alt=""
				width={260}
				height={278}
				className={s.decorativeImage}
				priority
			/>

			<p className={s.subTitle}>지금 내게 필요한 툴과 커뮤니티 정보</p>
			<h1 className={s.title}>daruda 검색</h1>

			<form onSubmit={handleSubmit} className={s.searchForm}>
				<input
					type="text"
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					placeholder="툴 이름, 기능, 커뮤니티 게시글 검색"
					className={s.searchInput}
				/>
				<button type="submit" className={s.searchSubmitButton} aria-label="검색">
					<Image src="/icons/ic_search_iris300_20.svg" alt="검색" width={20} height={20} />
				</button>
			</form>
		</header>
	);
}
