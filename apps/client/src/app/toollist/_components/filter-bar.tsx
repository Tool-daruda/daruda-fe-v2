"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as s from "./styles/filter-bar.css";

export const FilterBar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const isFreeOnly = searchParams.get("isFree") === "true";
	const sortBy = searchParams.get("criteria") || "popular";

	const updateQueryParams = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value) {
			params.set(key, value);
		} else {
			params.delete(key);
		}

		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<div className={s.container}>
			<button
				type="button"
				className={s.toggleWrapper}
				onClick={() => updateQueryParams("isFree", (!isFreeOnly).toString())}
				aria-pressed={isFreeOnly}
			>
				<span className={s.toggleLabel}>무료 툴만 모아보기</span>
				<div className={s.switchRoot} data-state={isFreeOnly ? "checked" : "unchecked"}>
					<div className={s.switchThumb} />
				</div>
			</button>

			<div className={s.sortWrapper}>
				<button
					type="button"
					className={`${s.sortItem} ${sortBy === "createdAt" ? "active" : ""}`}
					onClick={() => updateQueryParams("criteria", "createdAt")}
				>
					최신순
				</button>
				<div className={s.divider} />
				<button
					type="button"
					className={`${s.sortItem} ${sortBy === "popular" ? "active" : ""}`}
					onClick={() => updateQueryParams("criteria", "popular")}
				>
					인기순
				</button>
			</div>
		</div>
	);
};
