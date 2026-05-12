"use client";

import { useState } from "react";
import * as s from "./styles/filter-bar.css";

export const FilterBar = () => {
	const [isFreeOnly, setIsFreeOnly] = useState(false);
	const [sortBy, setSortBy] = useState("최신순");

	return (
		<div className={s.container}>
			<button
				type="button"
				className={s.toggleWrapper}
				onClick={() => setIsFreeOnly(!isFreeOnly)}
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
					className={`${s.sortItem} ${sortBy === "최신순" ? "active" : ""}`}
					onClick={() => setSortBy("최신순")}
				>
					최신순
				</button>
				<div className={s.divider} />
				<button
					type="button"
					className={`${s.sortItem} ${sortBy === "인기순" ? "active" : ""}`}
					onClick={() => setSortBy("인기순")}
				>
					인기순
				</button>
			</div>
		</div>
	);
};
