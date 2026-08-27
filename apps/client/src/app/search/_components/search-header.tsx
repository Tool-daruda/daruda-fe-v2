"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import * as s from "../styles/search-page.css";

interface SearchHeaderProps {
	initialKeyword: string;
}

export function SearchHeader({ initialKeyword }: SearchHeaderProps) {
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
		router.push(`/search?${params.toString()}`);
	};

	return (
		<header className={s.heroContainer}>
			<div className={s.heroBackdrop} />

			<p className={s.subTitle}>지금 내게 필요한 디지털 툴을 모아보다</p>
			<h1 className={s.title}>daruda 검색결과</h1>

			<form onSubmit={handleSubmit} className={s.searchForm}>
				<input
					type="text"
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					placeholder="툴 이름, 기능, 커뮤니티 게시글 검색"
					className={s.searchInput}
				/>
				<button type="submit" className={s.searchSubmitButton} aria-label="검색">
					<Image src="/icons/ic_search_iris300_20.svg" alt="" width={20} height={20} />
				</button>
			</form>
		</header>
	);
}
