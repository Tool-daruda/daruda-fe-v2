"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { SearchTab } from "@/common/api/models/search.model";
import * as s from "../styles/search-page.css";

interface SearchTabsProps {
	activeTab: SearchTab;
	toolCount?: number;
	communityCount?: number;
}

export function SearchTabs({ activeTab, toolCount, communityCount }: SearchTabsProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleTabChange = (tab: SearchTab) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("tab", tab);
		router.push(`/search?${params.toString()}`);
	};

	return (
		<div className={s.tabContainer}>
			<button
				type="button"
				className={s.tabButton}
				data-active={activeTab === "tool" ? "true" : "false"}
				onClick={() => handleTabChange("tool")}
			>
				툴 검색
				{typeof toolCount === "number" && <span className={s.resultCount}>({toolCount})</span>}
				{activeTab === "tool" && <div className={s.activeIndicator} />}
			</button>

			<button
				type="button"
				className={s.tabButton}
				data-active={activeTab === "community" ? "true" : "false"}
				onClick={() => handleTabChange("community")}
			>
				커뮤니티 검색
				{typeof communityCount === "number" && (
					<span className={s.resultCount}>({communityCount})</span>
				)}
				{activeTab === "community" && <div className={s.activeIndicator} />}
			</button>
		</div>
	);
}
