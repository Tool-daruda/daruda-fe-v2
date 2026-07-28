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
		<div className={s.headerSection}>
			<h1 className={s.title}>검색결과</h1>
			<p className={s.subTitle}>원하는 툴과 게시글 정보를 다루다에서 찾아보세요</p>

			<form onSubmit={handleSubmit} className={s.searchForm}>
				<input
					type="text"
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					placeholder="툴 이름, 기능, 커뮤니티 게시글 검색"
					className={s.searchInput}
				/>
				<button type="submit" className={s.searchSubmitButton} aria-label="검색">
					<Image src="/icons/ic_search_iris300_20.svg" alt="검색" width={24} height={24} />
				</button>
			</form>
		</div>
	);
}
