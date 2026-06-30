"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { BoardSortBy } from "@/common/api/models/board.model";
import * as s from "./styles/community-post-list.css";

interface CommunitySortTabsProps {
	sortBy: BoardSortBy;
}

const SORT_OPTIONS: { value: BoardSortBy; label: string }[] = [
	{ value: "LATEST", label: "최신순" },
	{ value: "SCRAP", label: "스크랩순" },
];

export const CommunitySortTabs = ({ sortBy }: CommunitySortTabsProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleSelect = (value: BoardSortBy) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value === "LATEST") {
			params.delete("sortBy");
		} else {
			params.set("sortBy", value);
		}

		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<div className={s.sortRow}>
			{SORT_OPTIONS.map((option, index) => (
				<div key={option.value} className={s.sortRow}>
					{index > 0 && <div className={s.sortDivider} />}
					<button
						type="button"
						className={s.sortItem}
						data-active={sortBy === option.value ? "true" : "false"}
						onClick={() => handleSelect(option.value)}
					>
						{option.label}
					</button>
				</div>
			))}
		</div>
	);
};
